/* eslint spaced-comment: 0 */
const assert = require('chai').assert;

/// title: Bookshop in Rome
/// type: arcade-mode

/// images:
'public/img/challenges/pexels-photo-358717.jpeg'

/// description:
`On your last day of vacation, a quaint used bookstore catches your eye on one of the smaller streets of Rome. "Perhaps this bookstore may have that out of print book I have been looking for all these years.". As you walk inside, you note the large pile of books in the back of the store and the sparsely-furnished bookshelves throughout. The shopkeep, a thin elderly man with combed back white hair and spectacles, seems to be deep in the process of organizing one of the bookshelves. You browse each aisle with ease due of the sparseness, but also because of your familiarity with the cover design of the book. It is then that you finally notice it on the bookshelf with other visibly old books. "They have it!" you think estatically. Of course, you made sure multiple times.

As you approach the shopkeep to purchase the book, he becomes visibly startled at your presence. "Goodness! I thought I had locked the door. I apologize, but due to the recent earthquake most of the books need to be resorted before I can reopen the store."

Noting the book you have in your hand, he continues. "That's quite the rare book. I can offer it to you if you help me sort through all the books here. I cannot sell it for anything else at this point."

Understanding that your flight is tomorrow, you only have today to sort through all the books. Luckily for you, you know a few sorting algorithms. You accept the shopkeep's offer.


Instructions: Given an array of book author last names, sort the books without using Array.prototype.sort().
`;

/// challengeSeed:
function sortBooks (arr) {
  // Good luck!
  return true;
}

/// solution:
function sortBooks (arr) {
  if (arr.length <= 1) {
    return arr;
  }
  // quick sort implementation
  const pivot = arr[Math.floor(arr.length / 2)]; // use approx middle element as pivot
  let leftIndex = 0;
  let rightIndex = arr.length - 1;
  while (leftIndex < rightIndex) {
    if (arr[leftIndex] >= pivot) {
      if (arr[rightIndex] <= pivot) {
        [arr[leftIndex], arr[rightIndex]] = [arr[rightIndex], arr[leftIndex]]; // swap
      }
      rightIndex--;
    }
    else leftIndex++;
  }

  const rightSide = arr.splice(leftIndex);
  const leftSide = arr;

  return sortBooks(leftSide).concat(sortBooks(rightSide));
}

/// tail:
function isSorted (arr) {
  const check = i => (i === arr.length - 1) ? true : (arr[i] > arr[i + 1]) ? false : check(i + 1);
  return check(0);
}

/// tests:
assert(typeof sortBooks === 'function', 'message: <code>sortBooks</code> is a function.');
assert(isSorted(sortBooks(['Rossi', 'Russo', 'Ferarri', 'Esposito', 'Bianchi', 'Romano'])), 'message: <code>sortBooks</code> returns a sorted array.');
assert.sameMembers(sortBooks(['Rossi', 'Russo', 'Ferarri', 'Esposito', 'Bianchi', 'Romano']), ['Rossi', 'Russo', 'Ferarri', 'Esposito', 'Bianchi', 'Romano']);
assert.strictEqual(code.search(/\.sort\(/), -1, 'message: <code>sortBooks</code> should not use the built-in <code>.sort()</code> method.');
