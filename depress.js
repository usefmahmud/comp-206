import http from "http";

export class Depress {
  constructor() {
    this.ROUTES_POOL = {};
  }

  registerRoute(path, method, handlerFunc) {
    const key = `${method.toUpperCase()}-${path}`;
    /*
        key: {
            handler,
            params,
            q
        }
    */
    this.ROUTES_POOL[key] = handlerFunc;
  }

  get(path, callback) {
    this.registerRoute(path, "GET", callback);
  }

  post(path, callback) {
    this.registerRoute(path, "POST", callback);
  }

  listen(port, callback) {
    const server = http.createServer((req, res) => {
      const path = req.url;
      const method = req.method;
      const key = `${method.toUpperCase()}-${path}`;

      const handlerFunc = this.ROUTES_POOL[key];
      if (handlerFunc) {
        handlerFunc(req, res);
      } else {
        res.writeHead(404);
        res.end("Not Found");
      }
    });

    server.listen(port, callback);
  }

  use(path, router) {
    const routerPool = router.ROUTES_POOL;
    for(const [key, val] of Object.entries(routerPool)) { // GET-/  ->  GET-/cars/
      const [method, routePath] = key.split("-");
      const fullPath = `${path}${routePath}`;
      this.registerRoute(fullPath, method, val);
    }
  } 
}

export class Router {
  constructor() {
    this.ROUTES_POOL = {};
  }

  registerRoute(path, method, handlerFunc) {
    const key = `${method.toUpperCase()}-${path}`;
    this.ROUTES_POOL[key] = handlerFunc;
  }

  get(path, callback) {
    this.registerRoute(path, "GET", callback);
  }

  post(path, callback) {
    this.registerRoute(path, "POST", callback);
  }
}

// router.get('/')
// router.get('/1)
