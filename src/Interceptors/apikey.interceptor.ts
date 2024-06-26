import { HttpInterceptorFn} from '@angular/common/http';


export const apikeyInterceptor: HttpInterceptorFn = (req, next) => {
 // const isApiReequest = req.url.startsWith('http://13.201.40.123:9999/api')
 const isApiReequest = req.url.startsWith('https://localhost:44335/api')

  const ApiKey ='abc'
  if(isApiReequest){
    req = req.clone({
      setHeaders:{
        'ApiKey': ApiKey,
      }
    });
  }
  return next(req);
};
