# alszla-app



An application that stores users data:

* Name
* Last Name
* Role



## Endpoints

GET: `/users`

Example cURL call: 

```
curl 127.0.0.1:9090/users
```



GET: `/users?id={userId}`

Example cURL call: 

```
curl 127.0.0.1:9090/users?id=7
```



POST `/users`

```
{
  "Name": string,
  "LastName": string,
  "Role": string
}
```

Example cURL call: 

```
curl -d '{"Name": "Caleb", "LastName": "Espinoza", "Role":"DevOps Engineer"}' -H "Content-Type: application/json" -X POST 127.0.0.1:9090/users
```



POST `/users?id={userId}`

Example cURL call:

```
curl -d '{"Name": "Caleb", "LastName": "Espinoza", "Role":"DevOps Engineer"}' -H "Content-Type: application/json" -X PUT 127.0.0.1:9090/users?id=7
```



DELETE `/users?id={userId}`

Example cURL call:

```
curl -H "Content-Type: application/json" -X DELETE 127.0.0.1:8080/users?id=7
```

