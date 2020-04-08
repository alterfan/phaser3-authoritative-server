# Phaser 3 authoritative server

> Позволяет вести просчет физики Phaser 3 на стороне сервера

### Usage

1. In main file `app.js` or `index.js` import module with options :
   Option | Argument | Description
   ---------|----------|---------
   `server` | **require** | The `require('http').Server(app)`.
   `io`| **require** |The Socket.io `require('socket.io').listen(server)`.
   `port`| **optional**|Default `8080`.

   #### Example:

   ```
   const express = require('express')
   const app = express()
   const server = require('http').Server(app)
   const io = require('socket.io').listen(server)
   const PhaserAuthoritativeServer = require('phaser3-authoritative-server')(server, io, 8080)
   ```

2. Then start scene with metod `startScene(url,imports)`:

   > In scene file not working 'import' and 'require'. Use `imports` option.

   | Option    | Argument     | Description                                                                                                                   |
   | --------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
   | `url`     | **require**  | The `require('http').Server(app)`.                                                                                            |
   | `imports` | **optional** | Object `{ key:value, key2:value2 }` were `key` is literal name,`value` is **string value** `url` or **module** `require(url)` |

   #### Example:

   ```
   var obj = {
   	Constants: '/src/shared/Constants.js',
   	fs: require('fs'),
   }
   PhaserAuthoritativeServer.startScene('/src/server/Scene.js', obj)
   ```
