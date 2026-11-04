# Automated Deployment & Security Workflow for Nihara D Aura

## 1. Security First (Crucial):
- **Never commit private keys, RSA keys, or secrets to Git**:
  - `*.pem`, `*.key`, `id_rsa`, certificates must ALWAYS be in `.gitignore`.
  - `.env` files must NEVER be tracked or pushed to public/private Git repositories.

## 2. Local Test & Documentation:
- Changes ko locally test karein.
- Nayi ya modified APIs ko `API_DOCUMENTATION.md` me update karein.

## 3. Git Commit & Push:
- `git add .` (Ensuring ignored secrets stay ignored)
- `git commit -m "<Clear descriptive message>"`
- `git push origin main`

## 4. AWS EC2 Sync & PM2 Reload:
- SSH se AWS EC2 (`32.236.58.112`) me pull aur restart karein:
  ```bash
  ssh -i Nihara-key.pem ubuntu@32.236.58.112 "cd /home/ubuntu/Nihara-D-Aura && git pull origin main && npm install --production && pm2 reload nihara-backend"
  ```
- Nginx already port 80 to 3000 proxy kar raha hai, isliye zero-downtime reload hoga.
