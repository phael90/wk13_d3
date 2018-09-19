use bucket_listdb;
db.dropDatabase();

// initial seed data 
db.bucket_list.insertMany([
  {
    title: "Meet an elephant",
    description: "Lorem ipsum something elephant",
    byAge: 40
  },
  {
    title: "Go to Japan",
    description: "Lorem ipsum something Japan",
    byAge: 36
  }
]);

