import dva from 'dva';
import './index.css';
import models from './models';
import routerConfig from './router';
// 1. Initialize
const app = dva({
  onError(e,dispatch){
    console.log(e);
  },
});

// 2. Plugins
// app.use({});
// 3. Model
models.forEach((m)=>{
  console.log(m);
  app.model(m.default);
});

// 4. Router
app.router(routerConfig);

// 5. Start
app.start('#container');
