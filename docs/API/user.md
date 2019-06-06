# User

| url                    | method | body                                 | data         |
| :--------------------- | :----- | :----------------------------------- | :----------- |
| /login                 | POST   | { uname\|email, password, remember?} | -            |
| /lotout                | GET    | -                                    | -            |
| /register              | POST   | { uname, email, password }           | -            |
| /api/users/detail/:uid | GET    | -                                    | {data: user} |
| /api/users/:uid        | GET    | -                                    | {data: user} |
| /api/users/password    | PUT    | {password, newPassword}              | -            |
