## Choose Your Own Adventure (Part 1)

We're going to use Backbone routers and history to implement a Choose-Your-Own-Adventure game. *This will be part 1 of a two-part assignment.* A harder version of this that touches on all parts of Backbone will be given tomorrow. (Much of this code can be adapted for that next assignment.)

### Normal Mode

Implement a Backbone router (and some view logic) to create a (very simple) e-reader for a "choose your own adventure"-style book, with all of the content coming via AJAX.

The router should accept two primary routes:

* `""`: Display the book's table of contents.
* `/page/:pageNumber`: Display the specified page of the book.

When displaying the table of contents, links to the beginning of each chapter should be displayed, with the link text being that chapter's title.

When displaying a book's page, that page's text should be displayed (obviously), along with links to the pages in the book that each represent an option available to the reader/protagonist. The link text to those pages should be the description of the action.

---

You'll need to make use of the following procedurally-generated APIs (running on your server).

* **GET** `/api/page/:pageNumber` -- Gets the lorem ipsum-ified content for the specified page number; returns that text as an object. The object contains the following properties..
    * `paragraphs`: An array of strings, representing paragraphs of text on the page
    * `links`: An array of (always two) objects, linking the reader to other pages to continue their adventure. Those objects contain the properties..
        * `page`: The page number to link to
        * `sentence`: The descriptive sentence to display for the reader's "action".

* **GET** `/api/toc` -- Gets a table of contents for the chapters in the book; returns that as an array of objects. Those objects contain the properties..
    * `page`: The page number to link to
    * `title`: The title of the chapter

