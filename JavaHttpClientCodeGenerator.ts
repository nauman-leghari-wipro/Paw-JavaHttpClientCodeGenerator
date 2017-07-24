
declare function require(module: string) : any;

declare function registerCodeGenerator(callback : Object) : void;

declare interface Request {
    name: string;
    url: string; 
    method: string;
    headers: Object;
    body: any;
    httpBasicAuth: Object;
    followRedirects: boolean, 
    sendCookies: boolean, 
    storeCookies: boolean, 
    timeout: number    
}

class ParsedURL {
    public schema = 'http'; 
    public host = 'localhost';
    public port = 80;
    public path = '/';
    
    constructor(url: string) {
        const regexp = /(https?):\/\/([^\/:]+):?(\d*)(\/?.*)/;
        const match = url.match(regexp);
        
        if (match) {
            this.schema = match[1];
            this.host = match[2];
            this.port = match[3].length > 0 ? +match[3] : (()=> {
               if (this.schema == 'https') return 443;
               return 80; 
            })();
            this.path = match[4];
        }
    }  
}

const getHttpClassForMethod = (m: String) : String => {
    const convertedMethod = m.charAt(0).toUpperCase() + m.substr(1).toLowerCase();
    return `Http${convertedMethod}`;
}

const addHeadersCommands = (headers: any) : String => {
    return Object.keys(headers).reduce((prevVal, elem) => prevVal + `request.add("${elem.trim()}", "${headers[elem].trim()}");\n\t\t`, "")
}

class JavaHttpClientCodeGenerator {
    static title = "Java Apache Http Client";
    static fileExtension = "java";
    static languageHighlighter = "java";
    static identifier = "io.nauman.PawExtensions.JavaHttpClientCodeGenerator";

    private multipleRequestNotice(request: Request[]) {
        if (request.length > 1) {
            return "// Warning: requests below are going to be executed in parallel\n\n"
        }
        return '';
    }

    public generate(context: any, requests: Request[], options) {
        if (!Array.isArray(requests)) {
            requests = [context.getCurrentRequest()];
        }
        return this.multipleRequestNotice(requests) + requests.map(this.generateRequest).join("\n");
    }

    private generateRequest(request: Request) {
        const parsedUrl = new ParsedURL(request.url);
        const httpClassForMethod = getHttpClassForMethod(request.method);
        const addingHeaders = addHeadersCommands(request.headers);

        return `// request ${request.name} 

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.${httpClassForMethod};
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.junit.Test;

import java.io.IOException;

import static com.jayway.jsonpath.matchers.JsonPathMatchers.hasJsonPath;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

public class TestClass {

    @Test
    public void testHttpCall() throws IOException {
        // given
        ${httpClassForMethod} request = new ${httpClassForMethod}("${request.url}");
        ${addingHeaders}
        
        // when
        HttpResponse response = HttpClientBuilder.create().build().execute(request);

        // then
        HttpEntity entity = response.getEntity();
        String jsonString = EntityUtils.toString(entity);

        // and if the response is
        // {
        //     "status": "OK"
        // }
        // Then we can assert it with
        assertThat(jsonString, hasJsonPath("$.status", is("OK")));
    }
}
`;
    }
}

registerCodeGenerator(JavaHttpClientCodeGenerator);
