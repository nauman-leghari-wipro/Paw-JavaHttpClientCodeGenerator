# Java Http Client Code Generator (Paw Extension)

A [Paw Extension](http://luckymarmot.com/paw/extensions/) that generates code using Apache HttpClient.

To add the generated code in your project, make sure that you have the following dependencies definied

```
<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpclient</artifactId>
    <version> select version </version>
</dependency>
```

And for testing Json responses

```
<dependency>
    <groupId>com.jayway.jsonpath</groupId>
    <artifactId>json-path</artifactId>
    <version>2.3.0</version>
    <scope>test</scope>
</dependency>
```

With Hamcresh matchers

```
<dependency>
    <groupId>com.jayway.jsonpath</groupId>
    <artifactId>json-path-assert</artifactId>
    <version>2.2.0</version>
    <scope>test</scope>
</dependency>
```

## Installation

- Checkout this repo
- type 'make install' 

## Development

### Build & Install

```shell
make install
```

### Watch

During development, watch for changes:

```shell
npm install 
npm run watch
```

## Tests 

There are some basic functional tests, which might be run using test/test.sh 

## License

Code copied from https://github.com/AndrianBdn/Paw-NodeHttpCodeGenerator

This Paw Extension is released under the [MIT License](LICENSE). Feel free to fork, and modify!

Copyright © 2017 Nauman Leghari
