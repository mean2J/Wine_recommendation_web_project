import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

//swagger 설정 파일

const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Test API",
        version: "1.0.0",
        description: "A REST API using swagger and express.",
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
    },
    apis: [],
  };
  
  const specs = swaggerJsDoc(options);

  //module.exports = { swaggerUi, specs };
  export { swaggerUi, specs };
