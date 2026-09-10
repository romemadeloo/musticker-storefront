# Allure Report Storage

This folder runs the official Allure Report Storage service with Docker Compose. It is wired for the Allure 3 setup in this repo.

## Start locally

1. Copy the env template:

   ```powershell
   Copy-Item ops\allure-report-storage\.env.example ops\allure-report-storage\.env
   ```

2. Generate two long random strings and put them into `.env` as `ACCESS_TOKEN` and `SECRET`:

   ```powershell
   [Convert]::ToHexString([Security.Cryptography.RandomNumberGenerator]::GetBytes(32)).ToLower()
   ```

3. Start the service:

   ```powershell
   docker compose --env-file ops\allure-report-storage\.env -f ops\allure-report-storage\compose.yaml up --build -d
   ```

4. Validate it:

   ```powershell
   Invoke-RestMethod http://localhost:3000/api/ping
   ```

## Mint the Allure CI token

For local testing, mint a token from localhost:

```powershell
$bootstrap = "<ACCESS_TOKEN from .env>"
Invoke-RestMethod -Method Post http://localhost:3000/api/token -Headers @{ Authorization = "Bearer $bootstrap" }
```

For GitHub Actions, Storage must be reachable from GitHub-hosted runners. Put the service behind your public HTTPS domain first, then mint the token using that public URL:

```powershell
$bootstrap = "<ACCESS_TOKEN from server .env>"
Invoke-RestMethod -Method Post https://allure-storage.example.com/api/token -Headers @{ Authorization = "Bearer $bootstrap" }
```

The response is the `ars1...` token. Add that value to GitHub repository secrets as `ALLURE_SERVICE_ACCESS_TOKEN`.

## Set the production branch

This project uses `production` as the primary report branch. If you need to re-register it, run this against your Storage URL with the bootstrap token:

```powershell
$bootstrap = "<ACCESS_TOKEN from .env>"
$body = @{ repo = "musticker-storefront"; main_branch = "production" } | ConvertTo-Json
Invoke-RestMethod -Method Post http://localhost:3000/api/projects/main-branch -Headers @{ Authorization = "Bearer $bootstrap"; "Content-Type" = "application/json" } -Body $body
```

## Browse reports

After CI publishes at least one report:

```text
https://<your-storage-domain>/reports/tree?repo=musticker-storefront
```

## Useful commands

```powershell
docker compose --env-file ops\allure-report-storage\.env -f ops\allure-report-storage\compose.yaml logs -f
docker compose --env-file ops\allure-report-storage\.env -f ops\allure-report-storage\compose.yaml down
```

The named Docker volume `report-data` contains both report files and the SQLite database. Back it up before moving machines or recreating Docker volumes.

## Deploy with GitHub Actions

Use the manual `Deploy Allure Report Storage` workflow when you want GitHub Actions to deploy this service to a remote Docker host.

Required GitHub repository secrets:

- `ALLURE_STORAGE_SSH_HOST`: public hostname or IP of the Docker host.
- `ALLURE_STORAGE_SSH_USER`: SSH user on the Docker host.
- `ALLURE_STORAGE_SSH_PRIVATE_KEY`: private key that can SSH to the Docker host.
- `ALLURE_STORAGE_ACCESS_TOKEN`: long random bootstrap token used by Storage.
- `ALLURE_STORAGE_SECRET`: long random signing secret used by Storage.
- `ALLURE_STORAGE_REPO_ADMIN_TOKEN`: fine-grained PAT that can write repository Actions secrets, required when `save_repo_secret=true`.

Optional GitHub repository secret:

- `ALLURE_STORAGE_SSH_PORT`: SSH port, defaults to `22`.

Run the workflow from GitHub Actions with:

- `public_url`: the public HTTPS URL that points to the Docker host, for example `https://allure-storage.example.com`.
- `deploy_path`: remote folder for `compose.yaml` and `.env`, default `/opt/allure-report-storage`.
- `main_branch`: use `production`.
- `port`: host port exposed by Docker, default `3000`.

The workflow starts Docker Compose on the host, validates `/api/ping`, mints the report access token from `public_url`, registers the main branch, and saves the minted token as `ALLURE_SERVICE_ACCESS_TOKEN`.
