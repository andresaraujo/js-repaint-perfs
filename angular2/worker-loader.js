console.log('worker!')
importScripts("https://code.angularjs.org/2.0.0-beta.8/angular2-polyfills.js",
              "../ENV-worker.js",
	          "https://code.angularjs.org/tools/typescript.js",
	          "https://code.angularjs.org/tools/system.js",
              "./lib/worker.dev.js"
              );

System.config({
		transpiler: 'typescript',
		typescriptOptions: {
    		emitDecoratorMetadata: true
  		},
		map: {
			app: 'app',
			
		},
		packages: {
			app: {
				defaultExtension: 'ts',
				main: 'app.ts'
			}
		}
	})
	

System.import("./worker-app.ts")
  .catch(function(err){
	  console.log(err)
  })
