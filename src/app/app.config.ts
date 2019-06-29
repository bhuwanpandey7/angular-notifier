import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppConfig {

    private config = null;
    private env = null;

    constructor(private http: HttpClient) {
    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    /**
     * Use to get the data found in the first file (env file)
     */
    public getEnv(key: any) {
        return this.env[key];
    }

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    public load() {
        return new Promise((resolve) => {
            this.http.get('./assets/env/env.json')
                .catch((error: any): any => {
                    resolve(false);
                    return Observable.throw(error.json().error || 'Server error');
                })
                .subscribe((envResponse: { env: string; }) => {
                    this.env = envResponse;
                    let request: any = null;

                    switch (envResponse.env) {
                        case 'production': {
                            request = this.http.get('./assets/env/env.' + envResponse.env + '.json');
                        }                  break;

                        case 'development': {
                            request = this.http.get('./assets/env/env.' + envResponse.env + '.json');
                        }                   break;

                        case 'default': {
                            console.error('Environment file is not set or invalid');
                            resolve(true);
                        }               break;
                    }

                    if (request) {
                        request
                            .map((response: any) => response)
                            .catch((error: any) => {
                                console.error('Error reading ' + envResponse.env + ' configuration file');
                                resolve(error);
                                return Observable.throw(error.json().error || 'Server error');
                            })
                            .subscribe((responseData: any) => {
                                this.config = responseData;
                                resolve(true);
                            });
                    } else {
                        console.error('Env config file "env.json" is not valid');
                        resolve(true);
                    }
                });
        });
    }
}
