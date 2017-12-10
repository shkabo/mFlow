define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "name": "auth_Login",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n        \t\"email\": \"example1@test.com\",\n        \t\"password\": \"test123\"\n        }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTM1Mjg4NDA4NzN9.gTSVjrSucxJRuc0ofDvMS91x2r663Wts-fkkc-C7hB8\",\n    \"expires\": 1513528840873,\n    \"user\": {\n        \"_id\": \"5a2d63858c6781413991d526\",\n        \"email\": \"example1@test.com\",\n        \"full_name\": \"John Doe\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401\n{\n    \"status\": 401,\n    \"message\": \"Invalid credentialss\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/inout/:id",
    "title": "create",
    "name": "inouts_create",
    "group": "In_Out",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Project ID hash</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "product",
            "description": "<p>Product ID hash</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quatity",
            "description": "<p>Quantity/Amount of products added to project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_add",
            "description": "<p>User ID hash who added this in/out</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_take",
            "description": "<p>User ID hash who took tese products for project</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n          \t\"product\": \"5a2d6f68acea6260dbec6bf5\",\n          \t\"quantity\": 760,\n          \t\"user_add\": \"5a2d63778c6781413991d525\",\n          \t\"user_take\": \"5a2d63778c6781413991d525\"\n          }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n           \"product\": {\n               \"_id\": \"5a2d6f68acea6260dbec6bf5\",\n               \"name\": \"Example Product\",\n               \"price\": 35\n           },\n           \"quantity\": 760,\n           \"user_add\": {\n               \"_id\": \"5a2d63778c6781413991d525\",\n               \"full_name\": \"Example User\"\n           },\n           \"user_take\": {\n               \"_id\": \"5a2d63778c6781413991d525\",\n               \"full_name\": \"Example User\"\n           },\n           \"project_id\": \"5a2d8506a7b0be6faf78e69c\",\n           \"_id\": \"5a2d8e391e5ff402c78d4943\",\n           \"created\": \"2017-12-10T19:42:49.029Z\"\n       }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/inouts.js",
    "groupTitle": "In_Out"
  },
  {
    "type": "post",
    "url": "/api/v1/inouts/:id",
    "title": "delete",
    "name": "inouts_delete",
    "group": "In_Out",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>inout ID hash</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200\n {\n   \"status\": 200,\n   \"message\": \"Addition successfully deleted\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n    \"status\": 400,\n    \"message\": \"We couldn't remove this addition or was not found in the database.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/inouts.js",
    "groupTitle": "In_Out"
  },
  {
    "type": "get",
    "url": "/api/v1/inouts/:id",
    "title": "getAll",
    "name": "inouts_getAll",
    "group": "In_Out",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Project ID hash</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n[\n         {\n             \"_id\": \"5a2d8e391e5ff402c78d4943\",\n             \"product\": {\n                 \"_id\": \"5a2d6f68acea6260dbec6bf5\",\n                 \"name\": \"Example Product\",\n                 \"price\": 35\n             },\n             \"quantity\": 760,\n             \"user_add\": {\n                 \"_id\": \"5a2d63778c6781413991d525\",\n                 \"full_name\": \"Example User\"\n             },\n             \"user_take\": {\n                 \"_id\": \"5a2d63778c6781413991d525\",\n                 \"full_name\": \"Example User\"\n             },\n             \"project_id\": \"5a2d8506a7b0be6faf78e69c\",\n             \"created\": \"2017-12-10T19:42:49.029Z\"\n         },\n         {\n             \"_id\": \"5a2d8f3e1e5ff402c78d4944\",\n             \"product\": {\n                 \"_id\": \"5a2d71dcacea6260dbec6bf6\",\n                 \"name\": \"Example2 Product\",\n                 \"price\": 44\n             },\n             \"quantity\": 22,\n             \"user_add\": {\n                 \"_id\": \"5a2d63778c6781413991d525\",\n                 \"full_name\": \"Example User\"\n             },\n             \"user_take\": {\n                 \"_id\": \"5a2d63778c6781413991d525\",\n                 \"full_name\": \"Example User\"\n             },\n             \"project_id\": \"5a2d8506a7b0be6faf78e69c\",\n             \"created\": \"2017-12-10T19:47:10.279Z\"\n         }\n     ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/inouts.js",
    "groupTitle": "In_Out"
  },
  {
    "type": "post",
    "url": "/api/v1/product/",
    "title": "create",
    "name": "products_create",
    "group": "Products",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "full_name",
            "description": "<p>Users Full name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n        \t\"name\": \"UTP Cat6\",\n        \t\"price\": 35\n        }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n             \"status\": 200,\n             \"message\": \"Successfuly added new product\",\n             \"productId\": \"5a2d6f68acea6260dbec6bf5\"\n         }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n    \"status\": 400,\n    \"message\": \"There was an error creating new product\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/products.js",
    "groupTitle": "Products"
  },
  {
    "type": "delete",
    "url": "/api/v1/product/:id",
    "title": "delete",
    "name": "products_delete",
    "group": "Products",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Products ID hash</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n             \"status\": 200,\n             \"message\": \"Product successfully deleted\"\n\n         }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n    \"status\": 400,\n    \"message\": \"Specified product couldn't be found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/products.js",
    "groupTitle": "Products"
  },
  {
    "type": "get",
    "url": "/api/v1/product/like",
    "title": "findLike",
    "name": "products_findLike",
    "group": "Products",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Part of the products name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n            \"name\": \"exa\"\n        }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n[\n         {\n             \"_id\": \"5a2d71dcacea6260dbec6bf6\",\n             \"name\": \"example 1\",\n             \"price\": 32\n         }\n     ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/products.js",
    "groupTitle": "Products"
  },
  {
    "type": "get",
    "url": "/api/v1/products",
    "title": "getAll",
    "name": "products_getAll",
    "group": "Products",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n[\n         {\n             \"_id\": \"5a2d6f68acea6260dbec6bf5\",\n             \"name\": \"product 1\",\n             \"price\": 35\n         },\n         {\n             \"_id\": \"5a2d71dcacea6260dbec6bf6\",\n             \"name\": \"product 2\",\n             \"price\": 32\n         }\n     ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/products.js",
    "groupTitle": "Products"
  },
  {
    "type": "get",
    "url": "/api/v1/product/:id",
    "title": "getOne",
    "name": "products_getOne",
    "group": "Products",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Products ID hash</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n[\n           {\n               \"_id\": \"5a2d6f68acea6260dbec6bf5\",\n               \"name\": \"product 1\",\n               \"price\": 35\n           }\n       ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/products.js",
    "groupTitle": "Products"
  },
  {
    "type": "put",
    "url": "/api/v1/product/:id",
    "title": "update",
    "name": "products_update",
    "group": "Products",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Products ID hash</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "full_name",
            "description": "<p>Users Full name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n        \t\"name\": \"example 11\",\n        \t\"price\": 355\n        }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n             \"status\": 200,\n             \"message\": \"Success\",\n             \"data\": {\n                 \"_id\": \"5a2d71dcacea6260dbec6bf6\",\n                 \"name\": \"example 11\",\n                 \"price\": 355\n             }\n         }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n    \"status\": 400,\n    \"message\": \"Specified product couldn't be found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/products.js",
    "groupTitle": "Products"
  },
  {
    "type": "post",
    "url": "/api/v1/project/",
    "title": "create",
    "name": "projects_create",
    "group": "Projects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Project name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Project description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Users ID hash</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n            \"name\": \"Project 1\",\n            \"description\": \"Example project 1\",\n            \"user\": \"5a2d63778c6781413991d525\"\n          }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n             \"name\": \"Project 1\",\n             \"description\": \"Example project 1\",\n             \"user\": {\n                 \"_id\": \"5a2d63778c6781413991d525\",\n                 \"full_name\": \"Example User\"\n             },\n             \"_id\": \"5a2d8253a7b0be6faf78e69b\",\n             \"created\": \"2017-12-10T18:52:03.906Z\",\n             \"status\": 1\n         }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/projects.js",
    "groupTitle": "Projects"
  },
  {
    "type": "post",
    "url": "/api/v1/project/:id",
    "title": "delete",
    "name": "projects_delete",
    "group": "Projects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Project ID hash</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n            \"status\": 200,\n            \"message\": \"Project successfully deleted\",\n         }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n    \"status\": 400,\n    \"message\": \"Requested project does not exist so we couldn't remove it\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/projects.js",
    "groupTitle": "Projects"
  },
  {
    "type": "get",
    "url": "/api/v1/projects",
    "title": "getAll",
    "name": "projects_getAll",
    "group": "Projects",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n[\n         {\n             \"_id\": \"5a2d8253a7b0be6faf78e69b\",\n             \"name\": \"Project 1\",\n             \"description\": \"Project 1 description\",\n             \"user\": {\n                 \"_id\": \"5a2d63778c6781413991d525\",\n                 \"full_name\": \"Example User\"\n             },\n             \"created\": \"2017-12-10T18:52:03.906Z\",\n             \"status\": 1\n         },\n         {\n             \"_id\": \"5a2d8506a7b0be6faf78e69c\",\n             \"name\": \"Project 2\",\n             \"description\": \"Project 2 description\",\n             \"user\": {\n                 \"_id\": \"5a2d63778c6781413991d525\",\n                 \"full_name\": \"Example User\"\n             },\n             \"created\": \"2017-12-10T19:03:34.141Z\",\n             \"status\": 1\n         }\n     ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/projects.js",
    "groupTitle": "Projects"
  },
  {
    "type": "get",
    "url": "/api/v1/project/:id",
    "title": "getOne",
    "name": "projects_getOne",
    "group": "Projects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Projects ID hash</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n[\n          {\n              \"_id\": \"5a2d8253a7b0be6faf78e69b\",\n              \"name\": \"Project 1\",\n              \"description\": \"Project 1 description\",\n              \"user\": {\n                  \"_id\": \"5a2d63778c6781413991d525\",\n                  \"full_name\": \"Example User\"\n              },\n              \"created\": \"2017-12-10T18:52:03.906Z\",\n              \"status\": 1\n          }\n        ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/projects.js",
    "groupTitle": "Projects"
  },
  {
    "type": "post",
    "url": "/api/v1/project/:id",
    "title": "update",
    "name": "projects_update",
    "group": "Projects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Project ID hash</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Project name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Project description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n            \"description\": \"new Example project 1 description\",\n          }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n             \"name\": \"Project 1\",\n             \"description\": \"new Example project 1 description\",\n             \"user\": {\n                 \"_id\": \"5a2d63778c6781413991d525\",\n                 \"full_name\": \"Example User\"\n             },\n             \"_id\": \"5a2d8253a7b0be6faf78e69b\",\n             \"created\": \"2017-12-10T18:52:03.906Z\",\n             \"status\": 1\n         }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/projects.js",
    "groupTitle": "Projects"
  },
  {
    "type": "post",
    "url": "/api/v1/user/",
    "title": "create",
    "name": "users_create",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "full_name",
            "description": "<p>Users Full name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n          \"full_name\": \"Bosko Stupar\",\n          \"email\": \"example@test.com\",\n          \"password\": \"test123\"\n        }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n             \"status\": 200,\n             \"message\": \"Successfuly added new user\",\n             \"userid\": \"5a2d63858c6781413991d526\"\n         }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n    \"status\": 400,\n    \"message\": \"There was an error creating user\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/api/v1/user/:id",
    "title": "delete",
    "name": "users_delete",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Users id hash</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n         \"status\": 200,\n         \"message\": \"User successfully deleted\"\n     }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n    \"status\": 400,\n    \"message\": \"We couldn't find that user\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/v1/users",
    "title": "getAll",
    "name": "users_getAll",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n[\n         {\n             \"_id\": \"5a2d63778c6781413991d525\",\n             \"email\": \"example1@test.com\",\n             \"full_name\": \"Example One\"\n         },\n         {\n             \"_id\": \"5a2d63858c6781413991d526\",\n             \"email\": \"example2@test.com\",\n             \"full_name\": \"Example Two\"\n         }\n     ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/v1/user/:id",
    "title": "getOne",
    "name": "users_getOne",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Users ID hash</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n[\n         {\n             \"_id\": \"5a2d63858c6781413991d526\",\n             \"email\": \"example1@test.com\",\n             \"full_name\": \"Example One\"\n         }\n     ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n    \"status\": 400,\n    \"message\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/api/v1/user/:id",
    "title": "update",
    "name": "users_update",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Users id hash</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password to be changed</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n        \t\"password\": \"test1233\"\n        }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n         \"status\": 200,\n         \"message\": \"Success\",\n         \"data\": {\n             \"_id\": \"5a2d63858c6781413991d526\",\n             \"email\": \"example@test.com\",\n             \"full_name\": \"Bosko Stupar\",\n             \"password\": \"test1233\"\n         }\n     }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n    \"status\": 400,\n    \"message\": \"There was an error creating user\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/users.js",
    "groupTitle": "User"
  }
] });
