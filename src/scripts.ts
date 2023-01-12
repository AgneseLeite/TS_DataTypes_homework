// If you get stucked, here is the docs: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

// Exercise 1, 
// Create the Product interface based on the following example products.
// - type can be only "Program" or "Course"
// - currency can be only "USD", "HUF", "EUR"
//
// If you get stuck with the createdAt, check what is the return type of
// Date.parse (you can hover your mouse over it).

type Program = {
    id: number,
    title: string,
    price: string,
    createdAt: number,
    currency: string,
    type: string,
    relatedCourses: {[key: string]: number | string}[]
}

export interface Product {
    id: number;
    title: string;
    price: string;
    createdAt: number;
    currency: string;
    type: string;
    relatedCourses: Program[];
  }
  
  const products: Product[] = [
    {
      id: 4,
      title: "How to Hack NASA with HTML",
      price: "5000.00",
      createdAt: Date.parse("2022-05-18T14:48:00"),
      currency: "HUF",
      type: "Course",
      relatedCourses: [],
    },
    {
      id: 6,
      title: "Cat Grooming Masterclass",
      price: "10.00",
      createdAt: Date.parse("2022-05-19T16:00:00"),
      currency: "USD",
      type: "Program",
      relatedCourses: [
        {
          id: 11,
          title: "Lying Yourself, that you are the Master",
          price: "0.00",
          createdAt: Date.parse("2022-05-18T16:00:00"),
          currency: "USD",
          type: "Course",
          relatedCourses: [],
        },
        {
          id: 16,
          title: "Taming your cat, a life long learning",
          price: "0.00",
          createdAt: Date.parse("2022-05-17T16:00:00"),
          currency: "USD",
          type: "Course",
          relatedCourses: [],
        },
      ],
    },
  ]
  
  
  // Exercise 2,
  // Add type annotations to the arguements and return types 
  // of these two functions. 
  
  function filterCourses(products: Product[]): Product[] {
    return products.filter(product => product.type === 'Course')
  }
  
  function getTitles(products: Product[]): string[] {
   return products.map(product => product.title)
  }
  
  // Exercise 3,
  // When Typescript infers correctly the types and when it is necessary
  // to define them explicitly? Try to remove type annotations from the 
  // filterCourses and getTitles functions
  // above. Hover the mouse to the variables to check the inferred types.
  // When do you see "any", and when something else?
  
  // This two functions just here to check the proper return type in the tests.
  const courses = filterCourses(products)
  const titles1 = getTitles(products)
  
  
  // Exercise 4,
  // Can I pass a Product object to the format Price function without
  // typescript error? Why? 
  // Spot that the inline type annotation here is different than the
  // Product's type definition.  
  function formatPrice(product: {price: string, currency: string}) {
    return `${product.price} ${product.currency}`
  }
  
  // passing a product to the function, for tests only.
  const price2 = formatPrice(products[0])
  
  
  
  
  
  // Everyday Types
  // If you get stucked, here is the docs: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
  
  // Exercise 1) Primitives and arrays
  
  // TODO: remove the "any" type, and add a concerete type for these basic primitives
  // How they are working, if you remove all type definitions? How inference is working here?
  
  let price: number; /* add the correcy type annotation here instead of any */
  price = 100.5
  
  let title: string /* add type annotation here */
  title = "How to Hack NASA with HTML?"
  
  let option: boolean /* add type annotation here */
  option = true
  
  let prices: number[] /* add type annotation here */
  prices = [3, 5, 100, 3.5]
  
  let titles: string[] /* add type annotation here */
  titles = ["How to Hack NASA with HTML?", "Cat Taming Masterclass"]
  
  let options: boolean[] /* add type annotation here */
  options = [true, true, false]
  
  // Exercise 2) Any
  
  // Here we have a product, which type is an explicit any.
  // Unforunately we have here a cat instead. It is clearly seen,
  // that everything is accepted, typescript basically switched off.
  // We will got a lot of runtime errors and unexpected undefineds
  // here.
  
  // TODO: Create a proper type definition based on the usage of the product,
  //    correct the input data and the function usage below based on that.

  type Cats = {
    name: string,
    kind: string,
    age: number,
    price: number | null
  }
  
  const anyProduct: Cats = {name: 'Mr. Fluff', kind: 'British Shorthair', age: 4, price: null}
  const productTitle = anyProduct.name;
  const priceWithTaxes = anyProduct.price * (1.25)
  const upperCaseTitle = anyProduct.price.toString().toUpperCase();
  
  // Exercise 3) Anonymus Functions
  
  // In JS we are putting anonymus functions to a lot of place, 
  //  typically in the higher order functions like map. Typescript
  //  can figure out the anonymus functions types based on the usage.
  
  // TODO: correct the parameter's type of createKeysFromTitles. Spot out
  //  how it is changing the map function's types. 
  const titelsToConvert = ["How to Hack NASA with HTML?", "Cat Taming Masterclass"]
  const createKeysFromTitles = (titles: string[]) => {
      return titles.map(title => title.toLowerCase().replace(" ", "_").replace("?", ""))
  }
  const keys = createKeysFromTitles(titelsToConvert)
  
  // Exercise 4) Union types
  
  // We have a common Course type in our codebase, unfortunately
  // it is not correctly typed, because some API endpoints return
  // the price in a string other endpoints in number format.
  
  // TODO: Change the Course interface to conform all possible formats.
  //  (Check the type errors in the usages below.)
  interface Course {
      title: string,
      price: number | string,
  }
  
  const checkoutCourse: Course = {
      title: "What You can Learn from Your Cat?",
      price: 100.0,
  }
  const shoppingCartCourse: Course = {
      title: "What You can Learn from your Cat?",
      price: "100.0"
  }
  
  // TODO: Ooops, after the Course interface is changed,
  //  something is gone wrong here. Correct the funtion body for now
  //  creatively, in the Narrowing chapter we will see a lot of
  //  patterns to handle these cases.
  const getTax = (course: {[key: string]: number}) => {
      return course.price * 0.25
  }
  
  // Exercise 5) Types Aliases
  //
  // We can use type aliases with
  // type keyword for any annotations.
  
  // TODO: fill the Type Alias for the account object
  //  based on the example object below. Spot out
  //  the differences betweeb the interface declarations.
  //  Note type alias can be used for any type, not just
  //  objects. Check the examples in the handbook.

  type Account = {
    id: number,
    name: string,
    currency: string
  }
  
  const account: Account = {
      id: 5,
      name: "Awesome Account",
      currency: "USD",
  }
  const getAccountName = (account: Account) => account.name
  // TODO: Interesting, here we are not using the Account Type Alias,
  //  however the function is correctly typed, and accepts accounts.
  //  Why?
  const getCurrency = (account: {name: string, currency: string}) => account.currency
  
  const accountName = getAccountName(account)
  const accountCurrency = getCurrency(account)
  
  // Exercise 6) Type Assertions
  //
  // It is possible to tell Typescript how to
  // handle some data. Typically this data is 
  // comes from the API.
  
  // TODO: The fetch account method just fetch a general object,
  //  In our application we trust in the API. Assert it to an 
  //  Account type (declared above) to be able to use it as an Account
  //  in the other parts of the application.  
  const fetchAccount = (id: number): Account => ({id: id, name: "Some Account", currency: "USD"})
  const currentAccount = fetchAccount(4) /* add Type Assertion here */
  const currentAccountName = currentAccount.name
  
  // Exercies 6) Literal types
  //
  // This is an important exercise. If a type is a
  //  concerete value like "USD" or 7, it is handled as 
  //  a type "constant". We have already used it in the 
  //  first chapter in the Product.type property.
  //  Check here the variable types and the error messages.
  //
  // https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
  
 

  // TODO: Correct the Currency type, to accept
  //  both EUR and USD. How can you define two possible
  //  types for one type? (we have seen before
  //  with numbers and strings).

  type Currency = 'EUR' | 'USD';

  const firstCurrency: Currency = 'USD';
  const secondCurrency: Currency = 'EUR';
  const usd: Currency = firstCurrency;
  const eur: Currency = secondCurrency;
  
  // TODO: When corrected the Currency type, another issue come up
  //  later in the code. 
  //  Check the inferred type of the someAccount variable.
  //  It is inferred to string, but in the getSomeCurrency
  //  function we using our Currency type. How add some Type 
  //  assertion to the someAccount object to correct the later
  //  usage of the someAccount variable. 
  //
  // https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases

  type AccountType = {
    name: string,
    currency: Currency
  }

  const someAccount: AccountType = {
      name: "My Awesome Account",
      currency: "USD"
  }
  
  const getSomeCurrency = (account: {currency: Currency}) => account.currency
  const someCurrency = getSomeCurrency(someAccount)
  
  // Exercise 7) null and undefined
  //
  // Null and undefined are interchangeable
  // in Javascript. In typescript it depends on
  // the strictNullChecks compiler options.
  // In this editor, and in our production code
  // it is switched on. Check how does it works.
  //
  // https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined
  
  // TODO correct AccountWithOrWithoutCurrency or
  //  the removeCurrency function body to get rid off 
  //  the type errors.
  type AccountWithOrWithoutCurrency = {
      name: string,
      currency: 'USD' | 'EUR' | undefined | null
  }
  const removeCurrency = (account: AccountWithOrWithoutCurrency): AccountWithOrWithoutCurrency => {
      return {
          ...account,
          currency: null
      }
  }
  


  /*------- Second Part --------*/

  /*

Welcome to:

    ................................................................
    .                                                              .
    .     ####################    ####################      E      .
    .     ####################    ####################      X      .
    .             ####            ####                      E      .
    .             ####            ####                      R      .
    .             ####            ####################      C      .
    .             ####                            ####      I      .
    .             ####                            ####      S      .
    .             ####            ####################      E      .
    .             ####            ####################      S      .
    .                                                              .
    ................................................................

    The goal: Let everyone play with many different TypeScript features
    and get an overview of TypeScript capabilities and principles.

    Things to cover:

        1. Basic typing.
        2. Refining types.
        3. Union types.
        4. Merged types.
        5. Generics.
        6. Type declarations.
        7. Module augmentation.
        8. Advanced type mapping.

    Rules and principles:

        1. Avoid using "any" type at all costs.
        2. Difficulty quickly grows one exercise after another.
        3. Feel free to send pull-requests if you've come up
           with improvements!
        4. Provide feedback to the creator of these exercises.
        5. Enjoy.

Brief UI guide:

    +--------------------------------------------------------------+
    | TypeScript exercises                                         |
    +--------------------------------------------------------------+
    | Exercises 1·2·3·4...   << Navigate through exercises >>      |
    +---------------+----------------------------------------------+
    | Files         | file.ts   << Filename and status >>          |
    +---------------+----------------------------------------------+
    | file.ts       | 1  import {x} from 'y';                      |
    | dir           | 2                                            |
    |   sub.ts      | 3                                            |
    |               |                                              |
    | << Current    |   << Currently selected file code editor >>  |
    | exercise file |                                              |
    | structure >>  +----------------------------------------------+
    |               |                                              |
    |               |   << Errors to fix in order to proceed >>    |
    |               |                                              |
    +---------------+----------------------------------------------+

Intro:

    We are starting a small community of users. For performance
    reasons we have decided to store all users right in the code.
    This way we can provide our developers with more
    user-interaction opportunities. With user-related data, at least.
    All the GDPR-related issues will be solved some other day.
    This would be the base for our future experiments during
    these exercises.

Exercise:

    Given the data, define the interface "User" and use it accordingly.

*/

export interface User {
  name: string;
  age: number;
  occupation: string;
}


export const users: User[] = [
    {
        name: 'Max Mustermann',
        age: 25,
        occupation: 'Chimney sweep'
    },
    {
        name: 'Kate Müller',
        age: 23,
        occupation: 'Astronaut'
    }
];

export function logPerson(user: User) {
    console.log(` - ${user.name}, ${user.age}`);
}

console.log('Users:');
users.forEach(logPerson);



/*

Intro:

    All 2 users liked the idea of the community. We should go
    forward and introduce some order. We are in Germany after all.
    Let's add a couple of admins.

    Initially we only had users in the in-memory database. After
    introducing Admins, we need to fix the types so that
    everything works well together.

Exercise:

    Type "Person" is missing, please define it and use
    it in persons array and logPerson function in order to fix
    all the TS errors.

*/

export interface User {
  name: string;
  age: number;
  occupation: string;
}

export interface Admin {
  name: string;
  age: number;
  role: string;
}

export type Person = {
  name: string,
  age: number,
  occupation?: string,
  role?: string
};

export const persons: Person[] = [
  {
      name: 'Max Mustermann',
      age: 25,
      occupation: 'Chimney sweep'
  },
  {
      name: 'Jane Doe',
      age: 32,
      role: 'Administrator'
  },
  {
      name: 'Kate Müller',
      age: 23,
      occupation: 'Astronaut'
  },
  {
      name: 'Bruce Willis',
      age: 64,
      role: 'World saver'
  }
];

export function logPerson2(user: Person) {
  console.log(` - ${user.name}, ${user.age}`);
}

persons.forEach(logPerson2);


/*

Intro:

    Since we already have some of the additional
    information about our users, it's a good idea
    to output it in a nice way.

Exercise:

    Fix type errors in logPerson function.

    logPerson function should accept both User and Admin
    and should output relevant information according to
    the input: occupation for User and role for Admin.

*/

export interface User {
  name: string;
  age: number;
  occupation: string;
  role?: string;
}

export interface Admin {
  name: string;
  age: number;
  role: string;
  occupation?: string;
}

export type Person3 = User | Admin;

export const persons3: Person3[] = [
  {
      name: 'Max Mustermann',
      age: 25,
      occupation: 'Chimney sweep'
  },
  {
      name: 'Jane Doe',
      age: 32,
      role: 'Administrator'
  },
  {
      name: 'Kate Müller',
      age: 23,
      occupation: 'Astronaut'
  },
  {
      name: 'Bruce Willis',
      age: 64,
      role: 'World saver'
  }
];

export function logPerson3(person: Person3) {
  let additionalInformation: string;
  if (person.role) {
      additionalInformation = person.role;
  } else {
      additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

persons3.forEach(logPerson3);


/*

Intro:

    As we introduced "type" to both User and Admin
    it's now easier to distinguish between them.
    Once object type checking logic was extracted
    into separate functions isUser and isAdmin -
    logPerson function got new type errors.

Exercise:

    Figure out how to help TypeScript understand types in
    this situation and apply necessary fixes.

*/

export interface UserX {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
  role?: string;
}

export interface AdminX {
  type: 'admin';
  name: string;
  age: number;
  role: string;
  occupation?: string;
}

export type Person4 = UserX | AdminX;

export const persons4: Person4[] = [
  { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
];

export function isAdmin(person: Person4) {
  return person.type === 'admin';
}

export function isUser(person: Person4) {
  return person.type === 'user';
}

export function logPerson4(person: Person4) {
  let additionalInformation: string = '';
  if (isAdmin(person)) {
      additionalInformation = person.role;
  }
  if (isUser(person)) {
      additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

console.log('Admins:');
persons4.filter(isAdmin).forEach(logPerson4);

console.log();

console.log('Users:');
persons4.filter(isUser).forEach(logPerson4);



/*

Intro:

    Time to filter the data! In order to be flexible
    we filter users using a number of criteria and
    return only those matching all of the criteria.
    We don't need Admins yet, we only filter Users.

Exercise:

    Without duplicating type structures, modify
    filterUsers function definition so that we can
    pass only those criteria which are needed,
    and not the whole User information as it is
    required now according to typing.

Higher difficulty bonus exercise:

    Exclude "type" from filter criterias.

*/

interface UserY {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface AdminY {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

export type Person5 = UserY | AdminY;

export const persons5: Person5[] = [
  { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
  {
      type: 'admin',
      name: 'Jane Doe',
      age: 32,
      role: 'Administrator'
  },
  {
      type: 'user',
      name: 'Kate Müller',
      age: 23,
      occupation: 'Astronaut'
  },
  {
      type: 'admin',
      name: 'Bruce Willis',
      age: 64,
      role: 'World saver'
  },
  {
      type: 'user',
      name: 'Wilson',
      age: 23,
      occupation: 'Ball'
  },
  {
      type: 'admin',
      name: 'Agent Smith',
      age: 23,
      role: 'Administrator'
  }
];

export const isAdminY = (person: Person5): person is AdminY => person.type === 'admin';
export const isUserY = (person: Person5): person is UserY => person.type === 'user';

export function logPerson5(person: Person5) {
  let additionalInformation = '';
  if (isAdminY(person)) {
      additionalInformation = person.role;
  }
  if (isUserY(person)) {
      additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

export function filterUsers(persons: Person5[], criteria: Partial<Omit<UserY, 'type'>>): UserY[] {
  return persons.filter(isUserY).filter((user) => {
      const criteriaKeys = Object.keys(criteria) as (keyof Omit<UserY, 'type'>)[];
      return criteriaKeys.every((fieldName) => {
          return user[fieldName] === criteria[fieldName];
      });
  });
}

console.log('Users of age 23:');

filterUsers(
  persons5,
  {
      age: 23
  }
).forEach(logPerson5);