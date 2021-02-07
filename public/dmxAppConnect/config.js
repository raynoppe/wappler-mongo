dmx.config({
  "main": {
    "maindata": [
      {
        "type": "text",
        "name": "jwt"
      },
      {
        "type": "text",
        "name": "firstname"
      },
      {
        "type": "text",
        "name": "email"
      },
      {
        "type": "text",
        "name": "privs"
      }
    ],
    "localStorage": [
      {
        "type": "text",
        "name": "email"
      },
      {
        "type": "text",
        "name": "firstname"
      },
      {
        "type": "text",
        "name": "jwt"
      },
      {
        "type": "text",
        "name": "role"
      }
    ]
  },
  "index": {
    "form_check_email": [
      {
        "type": "object",
        "name": "data",
        "sub": [
          {
            "type": "text",
            "name": "email"
          }
        ]
      },
      {
        "type": "object",
        "name": "headers"
      }
    ]
  },
  "app": {
    "localStorage": [
      {
        "type": "text",
        "name": "email"
      },
      {
        "type": "text",
        "name": "firstname"
      },
      {
        "type": "text",
        "name": "jwt"
      },
      {
        "type": "text",
        "name": "role"
      },
      {
        "type": "text",
        "name": "teamid"
      },
      {
        "type": "text",
        "name": "teamname"
      }
    ],
    "api1": [
      {
        "type": "array",
        "name": "data",
        "sub": [
          {
            "type": "text",
            "name": "_id"
          },
          {
            "type": "text",
            "name": "firstname"
          },
          {
            "type": "text",
            "name": "lastname"
          },
          {
            "type": "text",
            "name": "mobile"
          },
          {
            "type": "number",
            "name": "verificationcode"
          },
          {
            "type": "text",
            "name": "role"
          },
          {
            "type": "text",
            "name": "organisation"
          },
          {
            "type": "text",
            "name": "userstate"
          },
          {
            "type": "text",
            "name": "email"
          },
          {
            "type": "text",
            "name": "privs"
          }
        ]
      },
      {
        "type": "object",
        "name": "headers",
        "sub": [
          {
            "type": "text",
            "name": "connection"
          },
          {
            "type": "text",
            "name": "content-length"
          },
          {
            "type": "text",
            "name": "content-type"
          },
          {
            "type": "text",
            "name": "date"
          },
          {
            "type": "text",
            "name": "etag"
          },
          {
            "type": "text",
            "name": "keep-alive"
          },
          {
            "type": "text",
            "name": "vary"
          }
        ]
      }
    ],
    "getteam": [
      {
        "type": "object",
        "name": "data",
        "sub": [
          {
            "type": "object",
            "name": "result",
            "sub": [
              {
                "type": "text",
                "name": "_id"
              },
              {
                "type": "text",
                "name": "teamname"
              },
              {
                "type": "array",
                "name": "teammembers",
                "sub": [
                  {
                    "type": "text",
                    "name": "_id"
                  },
                  {
                    "type": "text",
                    "name": "firstname"
                  },
                  {
                    "type": "text",
                    "name": "lastname"
                  },
                  {
                    "type": "text",
                    "name": "email"
                  }
                ]
              },
              {
                "type": "text",
                "name": "createdAt"
              },
              {
                "type": "text",
                "name": "updatedAt"
              },
              {
                "type": "text",
                "name": "createdBy"
              },
              {
                "type": "text",
                "name": "createdByName"
              }
            ]
          }
        ]
      },
      {
        "type": "object",
        "name": "headers",
        "sub": [
          {
            "type": "text",
            "name": "connection"
          },
          {
            "type": "text",
            "name": "content-length"
          },
          {
            "type": "text",
            "name": "content-type"
          },
          {
            "type": "text",
            "name": "date"
          },
          {
            "type": "text",
            "name": "etag"
          },
          {
            "type": "text",
            "name": "keep-alive"
          },
          {
            "type": "text",
            "name": "vary"
          }
        ]
      }
    ],
    "getteams": [
      {
        "type": "object",
        "name": "data",
        "sub": [
          {
            "type": "array",
            "name": "results",
            "sub": [
              {
                "type": "text",
                "name": "_id"
              },
              {
                "type": "text",
                "name": "teamname"
              },
              {
                "type": "array",
                "name": "teammembers"
              },
              {
                "type": "text",
                "name": "createdAt"
              },
              {
                "type": "text",
                "name": "updatedAt"
              },
              {
                "type": "text",
                "name": "createdBy"
              },
              {
                "type": "text",
                "name": "createdByName"
              },
              {
                "type": "text",
                "name": "showDel"
              }
            ]
          }
        ]
      },
      {
        "type": "object",
        "name": "headers",
        "sub": [
          {
            "type": "text",
            "name": "content-length"
          },
          {
            "type": "text",
            "name": "content-type"
          },
          {
            "type": "text",
            "name": "date"
          },
          {
            "type": "text",
            "name": "etag"
          },
          {
            "type": "text",
            "name": "vary"
          }
        ]
      }
    ],
    "query": [
      {
        "type": "text",
        "name": "teamid"
      }
    ],
    "teammembers": {
      "meta": [
        {
          "type": "text",
          "name": "_id"
        },
        {
          "type": "text",
          "name": "firstname"
        },
        {
          "type": "text",
          "name": "lastname"
        },
        {
          "type": "text",
          "name": "email"
        }
      ],
      "outputType": "array"
    }
  },
  "users": {
    "api1": [
      {
        "type": "array",
        "name": "data",
        "sub": [
          {
            "type": "text",
            "name": "_id"
          },
          {
            "type": "text",
            "name": "firstname"
          },
          {
            "type": "text",
            "name": "lastname"
          },
          {
            "type": "text",
            "name": "mobile"
          },
          {
            "type": "number",
            "name": "verificationcode"
          },
          {
            "type": "text",
            "name": "role"
          },
          {
            "type": "text",
            "name": "organisation"
          },
          {
            "type": "boolean",
            "name": "active"
          },
          {
            "type": "boolean",
            "name": "admin"
          },
          {
            "type": "boolean",
            "name": "usetfa"
          },
          {
            "type": "boolean",
            "name": "resetpass"
          },
          {
            "type": "array",
            "name": "permissions"
          },
          {
            "type": "text",
            "name": "email"
          },
          {
            "type": "text",
            "name": "createdAt"
          },
          {
            "type": "text",
            "name": "updatedAt"
          },
          {
            "type": "number",
            "name": "__v"
          },
          {
            "type": "text",
            "name": "privs"
          }
        ]
      },
      {
        "type": "object",
        "name": "headers",
        "sub": [
          {
            "type": "text",
            "name": "connection"
          },
          {
            "type": "text",
            "name": "content-length"
          },
          {
            "type": "text",
            "name": "content-type"
          },
          {
            "type": "text",
            "name": "date"
          },
          {
            "type": "text",
            "name": "etag"
          },
          {
            "type": "text",
            "name": "keep-alive"
          },
          {
            "type": "text",
            "name": "vary"
          }
        ]
      }
    ]
  },
  "teams": {
    "getteams": [
      {
        "type": "object",
        "name": "data",
        "sub": [
          {
            "type": "array",
            "name": "results",
            "sub": [
              {
                "type": "text",
                "name": "_id"
              },
              {
                "type": "text",
                "name": "teamname"
              },
              {
                "type": "array",
                "name": "teammembers"
              },
              {
                "type": "text",
                "name": "createdAt"
              },
              {
                "type": "text",
                "name": "updatedAt"
              },
              {
                "type": "text",
                "name": "createdBy"
              },
              {
                "type": "text",
                "name": "createdByName"
              }
            ]
          }
        ]
      },
      {
        "type": "object",
        "name": "headers",
        "sub": [
          {
            "type": "text",
            "name": "connection"
          },
          {
            "type": "text",
            "name": "content-length"
          },
          {
            "type": "text",
            "name": "content-type"
          },
          {
            "type": "text",
            "name": "date"
          },
          {
            "type": "text",
            "name": "etag"
          },
          {
            "type": "text",
            "name": "keep-alive"
          },
          {
            "type": "text",
            "name": "vary"
          }
        ]
      }
    ]
  },
  "teamedit": {
    "getteam": [
      {
        "type": "object",
        "name": "data",
        "sub": [
          {
            "type": "object",
            "name": "result",
            "sub": [
              {
                "type": "text",
                "name": "_id"
              },
              {
                "type": "text",
                "name": "teamname"
              },
              {
                "type": "array",
                "name": "teammembers"
              },
              {
                "type": "text",
                "name": "createdAt"
              },
              {
                "type": "text",
                "name": "updatedAt"
              },
              {
                "type": "text",
                "name": "createdBy"
              },
              {
                "type": "text",
                "name": "createdByName"
              }
            ]
          }
        ]
      },
      {
        "type": "object",
        "name": "headers",
        "sub": [
          {
            "type": "text",
            "name": "connection"
          },
          {
            "type": "text",
            "name": "content-length"
          },
          {
            "type": "text",
            "name": "content-type"
          },
          {
            "type": "text",
            "name": "date"
          },
          {
            "type": "text",
            "name": "etag"
          },
          {
            "type": "text",
            "name": "keep-alive"
          },
          {
            "type": "text",
            "name": "vary"
          }
        ]
      }
    ],
    "query": [
      {
        "type": "text",
        "name": "teamid"
      }
    ]
  }
});
