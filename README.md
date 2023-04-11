## Overview
To get started: `npm i` & `npm run dev`
To run tests: `npm run test`

## Structure
`./pages/index.js`The one and only page. Also contains all state for the app.

`./lib/` - The mock database and Chakra UI theme.

`./pages/api/products` - An api route to fetch products.

`./pages/api/components` - Mostly stateless components.

`./services` - Various methods to fetch products and determine date time.

## Styling
I chose Chakra UI mostly for rapid prototyping despite being objectively heavy handed for a project of this size.

## Logic to match a birthdate with a product
The following are some of the larger questions and nuances that came to mind when initially thinking about architecture.


**1. Obtaining the user's birthdate**
I chose the browser native date picker because it was easy and the design had "one" input. However, I find it clunky. Another option would be to use three selects.


`[Year]` `[month]` `day`


It also needs validation.

**1. There are two different units of measure in terms of time**
For this issue, I chose to simply use the month unit for all products. I realize for a larger array of products, this has the potential to become confusing. For example, representing a 12yo in months is odd but given the project spec, this felt the most pragmatic.


**2. What exactly, in actual time, does something like 3-4 months mean?**
Does it mean from 3 months old to 4 months old or does it mean 3 months to 4 months and 364 days? I chose the former. More on that below.

**3. Date/Time. How accurate does this have to be and is it acceptable to rely on the client?**
This is an interesting question because from a business perspective there is very likely a reason for this to NOT be exact. These are very much questions for a product manager but I could imagine there are a number of things that could impact how we calculate.

- Fulfillment + shipping + unpacking/setting up. Let’s say this takes a week, we're talking about the child "missing" over 10% of their "toy window".
- Related to the above, I assume it's ideal to grow into a given toy rather than receive it on the tail end of its appropriate age range.

Considering the above, I chose to break to the next toy at the max age and not the max age + 364 days for this reason.

I also chose to not take into account the user's timezone. I felt it was unwarranted complexity, the use of `new Date()` is unreliable and the precision loss of hours would be indistinguishable to the user — especially if we were to add additional offsets for shipping etc.

In terms of architecting the data to _actually_ doing the matching, originally I was thinking an object shape like the following on each product:
```js
age: {
   min: <some date>,
   max: <some date>,
   unit: 'weeks/months/etc'
}
```

Ultimately, I chose to simplify this by adding a `maxAge` value. This allowed for a simple `products.find()` and simply looking for the first product to `childAge >= maxAgeDate;`. This does come with some compromises. If requirements became more complex, we had considerably more products, we're looking to match on more than one product, the former object shape would likely be preferable.

## Testing
Some potential additions to the basic tests in place.

1. Spy on `useQuery` and asset the correct value is being set for `fetchProduct`
2. Assert that the state change between "find a product" and "Product" happens.
3. Mock API response and assert that the proper loading, error, and success states happen.
4. e2e with Cypress or similar.
