## install soft

```sh
cnpm install vue-router --save
cnpm install axios --save
cnpm i element-ui -S
```

## install dependency

```sh
cnpm install url-loader --save-dev
cnpm install file-loader --save-dev
```

```text
build后文件大小报表
cnpm install --save-dev webpack-bundle-analyzer
```

```text
build时自动清空dist目录
cnpm install --save-dev clean-webpack-plugin
```
## install websocket

```sh
cnpm install --save webstomp-client
```

### websocket impl by [webstomp-client](https://github.com/JSteunou/webstomp-client)

#### connect

- connect(headers, connectCallback)
- connect(headers, connectCallback, errorCallback)
- connect(login, passcode, connectCallback)
- connect(login, passcode, connectCallback, errorCallback)
- connect(login, passcode, connectCallback, errorCallback, host)

#### disconnect

- disconnect(disconnectCallback, headers={})

#### send

- send(destination, body='', headers={})

#### subscribe

- subscribe(destination, callback, headers={})

#### unsubscribe

- unsubscribe(id, header={})
