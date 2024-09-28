
Run this code to with .env.

```bash
git clone https://github.com/uys2000-projects/uplayer-mehmetuysal-dev-proxy uplayer-mehmetuysal-dev-proxy-tmp
cp .env uplayer-mehmetuysal-dev-proxy-tmp/.env
cd uplayer-mehmetuysal-dev-proxy-tmp
yarn
yarn build
cd ..
cp -r uplayer-mehmetuysal-dev-proxy-tmp/dist uplayer-proxy
rm -rf uplayer-mehmetuysal-dev-proxy-tmp
node uplayer-proxy/main.js
```