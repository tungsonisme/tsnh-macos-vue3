# TSNH MacOS

## Installation
Run
```bash
pnpm install
```

## Development
### With remote applications from Gitlab
Run
```bash
pnpm dev
```
### With local applications
(From your application) 

Run localhost development in production mode
```bash
pnpm dev:prod
```

(From macos)

Create `.remotesdevrc.json` from `.remotesdevrc.json.example`

Specify port of local applications (unspecified application will still be fetched from Gitlab)
```json
{
  "remotes": [
    {
      // application name in .remotesrc.json
      "name": "pokemon", 
      // port where local application is running one
      "port": 4173
    }
  ]
}
```

Run
```bash
pnpm dev:local
```

## Production
Run
```bash
pnpm build
```

## Install new application (WIP)
Run
```bash
pnpm install:app
```