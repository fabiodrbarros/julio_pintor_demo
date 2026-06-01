# Deploy — Júlio Pintor (Docker)

App Next.js (output `standalone`) empacotada em Docker. O container ouve
internamente na porta **3000** (porta do Next); no host é publicada na **5001**
(ver `docker-compose.yml`).

## Local (testar antes da VPS)

```bash
# build da imagem
docker build -t julio-pintor:latest .

# correr (host 5001 -> container 3000)
docker run --rm -p 5001:3000 julio-pintor:latest
# abrir http://localhost:5001
```

Ou com Compose:

```bash
docker compose up -d --build
docker compose logs -f        # ver logs
docker compose down           # parar
```

---

## VPS — passo a passo

### 1. Pré-requisitos (uma vez)

Na VPS (Ubuntu/Debian), instalar Docker + plugin Compose:

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER     # entrar/sair da sessão depois disto
docker compose version            # confirmar
```

### 2. Clonar o repositório

```bash
git clone https://github.com/fabiodrbarros/julio_pintor_demo.git
cd julio_pintor_demo
```

### 3. (Opcional) Preencher contactos

Editar `data/company.ts` com telefone, email, WhatsApp e redes sociais.
Qualquer alteração ao código exige rebuild (passo seguinte).

### 4. Arrancar

```bash
docker compose up -d --build
```

A app fica em `http://IP_DA_VPS:5001`.

> Para mudar a porta do host, edita o mapeamento em `docker-compose.yml`
> (ex.: `"8080:3000"`). O lado direito (3000) é fixo — é a porta interna do Next.

### 5. Atualizar (sempre que houver mudanças no repo)

```bash
git pull
docker compose up -d --build
docker image prune -f      # limpar imagens antigas (opcional)
```

---

## Domínio + HTTPS (recomendado)

Coloca um **Nginx** à frente, com certificado Let's Encrypt. A app continua
só acessível internamente em `127.0.0.1:5001` (muda o mapeamento em
`docker-compose.yml` para `"127.0.0.1:5001:3000"` por segurança).

### Nginx (`/etc/nginx/sites-available/juliopintor`)

```nginx
server {
    listen 80;
    server_name juliopintor.pt www.juliopintor.pt;

    location / {
        proxy_pass         http://127.0.0.1:5001;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/juliopintor /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# HTTPS automático (gera e renova o certificado)
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d juliopintor.pt -d www.juliopintor.pt
```

---

## Alternativa: Cloudflare Tunnel (Zero Trust)

Em vez de expor portas/Nginx, esta app pode ser servida por um **Cloudflare
Tunnel** já existente (`cloudflared`). O segredo é os dois containers
partilharem uma rede Docker, para o `cloudflared` alcançar o site **pelo nome**.

O `docker-compose.yml` já liga o `julio-pintor` à rede externa **`web`**
(a mesma do `cloudflared`):

```yaml
networks:
  proxy:
    external: true
    name: web        # rede partilhada com o cloudflared
```

Depois, no dashboard **one.dash.cloudflare.com → Networks → Tunnels →**
(o teu túnel) **→ Public Hostnames → Add**:

| Campo | Valor |
| --- | --- |
| Subdomain / Domain | ex.: `juliopintor` . `teudominio.pt` |
| Type | `HTTP` |
| URL | `julio-pintor:3000` *(porta interna, não a 5001)* |

O DNS e o HTTPS são tratados pelo Cloudflare. Para o site ficar **só**
acessível pelo túnel, comenta o bloco `ports:` no `docker-compose.yml`.

---

## Notas

- **Arranque automático:** o `restart: unless-stopped` no Compose faz a app
  voltar a subir após reboot (com o serviço Docker ativo:
  `sudo systemctl enable docker`).
- **Imagens reais:** ao adicionar muitas fotografias e usar otimização do
  `next/image`, instala `sharp` no estágio runner do `Dockerfile`
  (`RUN npm i sharp`). Sem imagens raster, não é necessário.
- **Healthcheck:** definido no Compose (`wget` à raiz). Ver estado com
  `docker compose ps`.
- **Porta/host:** o servidor standalone respeita `PORT` e `HOSTNAME`
  (já definidos como `3000` e `0.0.0.0` no Dockerfile).
```
