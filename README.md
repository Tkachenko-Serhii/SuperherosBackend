# SuperherosBackend

# GET "/superheros" - get all superheros with pagination (1 page consist of 5 items)

# Responses: 200 - Ok; 500 - Server error;

# GET "/superheros/:id" - get superheros by ID. Request parameter (id) - required

# Responses: 200 - Ok; 404 - Not found; 500 - Server error;

# POST "/superheros" - create new superheros. Request body - required

{

        "nickname": "Batman",
        "real_name": "Clark Kent",
        "superpowers": "bob",

}

# Responses: 201 - Ok; 400 - Create error superheros; 500 - Server error;

# DELETE "/superheros/:id" - Delete superheros. Request parameter (id) - required

# Responses: 200 - Ok; 404 - Not found; 500 - Server error;

# PUT "/superheros/:id" - Update data of superheros. Request parameter (id) - required. Request body - required.

{

        "nickname": "Batman",
        "real_name": "Clark Kent",
        "superpowers": "bob",

}

# Responses: 200 - Ok; 400 - Missing required fields; 404 - Not found; 500 - Server error;

Superheros Schema: nickname: string, real_name: string, superpowers: string,
