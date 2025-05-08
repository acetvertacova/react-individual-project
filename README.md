# Individual Project: Moview Review Blog

## Installation and Project Launch Instructions

### Setting up the working environment

1. Download and install the latest or stable version of **Node.js**.

2. Check the installation of **Node.js** and **NPM** by running the following commands in the terminal:

    `node -v`
    
    `npm -v`

3. Navigate to the project folder and start the development server with `npm run dev`.

4. The required dependencies:
    - Axios: for making HTTP requests `npm install axios`
    - Yup: for validation schemas `npm install yup`
    - React Hook Form: for useForm `npm install react-hook-form`
    - @hookform/resolvers: to integrate react-hook-form with yup `npm install @hookform/resolvers`
    - React Toastify: for toast notifications `npm install react-toastify`
    - Heroicons (Solid): for icons `npm install @heroicons/react`
    - Redux Toolkit: for managing the states `npm install @reduxjs/toolkit`
    - React Redux: for connecting Redux to React `npm install react-redux`

## The Project's description

**The Movie Review App** is a modern React-based web application that allows users to browse, search, and post reviews for their favorite movies. The goal of the project is to provide a clean, responsive interface where users can share opinions, rate films, and discover trending content through community reviews.

✨ Features
- 🔍 Search movies by title, genre, director, and year
- 📝 Add reviews with custom ratings and comments
- 🌟 View reviews from other users
- ✏️ Update existing reviews
- 🗑️ Delete specific reviews
- ⭐ Add reviews to favorites for easy access later

## The Project's Structure

 src/
        │── layouts/
        │   └── MainLayout.jsx       # Main layout component (includes Header, Footer, Outlet.)
        |
        │── components/
        │   │── Footer.jsx
        │   │── Header.jsx
        │   │── ReviewCard.jsx       # Card view for individual reviews
        │   │── ReviewForm.jsx       # Form for creating and updating reviews
        │   │── Search.jsx           # Search bar component
        │   └── ReviewDetails.jsx    # Detailed view of a selected review
        |
        │── store/                   # Redux Toolkit store and feature slices
        │   │── favorites/                
        |   |   │── actions.js       
        │   |   └── slice.js         # Redux slice for managing favorites 
        │   └── store.js   
        |
        │── api/                   
        │   │── movie/                    
        │   |   └── movie.js         # Movie-specific API functions      
        │   └── api.js             
        |
        │── pages/                   # Route-based pages
        │   │── Home.jsx    
        |   │── Favorites.jsx
        |   └── NotFoundPage.jsx
        |
        │── validation/
        |   └── review.schema.js     # Validation schema for the review form (e.g., using Yup)
        |
        │── App.jsx                  # App entry point
        │── main.jsx
        │── App.css
        |── ...

## Usage example

1. **Home Page**

The Home Page of my movie review application serves as the main entry point where users can browse, search, and interact with movie reviews.

<img src="/movie-review/src/examples/HomePage.png">

Main Functionalities: 

1.1 *Data Fetching*

When the component mounts, it calls `movieApi.getMovies()` to fetch all movie reviews. Data is stored in two states: `movies` (the full list) and `filteredMovies` (filtered list by search).

```jsx
useEffect(() => {
        setLoading(true);
        setError(null);
        const fetchMovies = async () => {
            try {
                const data = await movieApi.getMovies();
                setMovies(data);
                setFilteredMovies(data);
            } catch (error) {
                console.error('An error loading:', error);
                setError(error.message || 'Failed to load movies-reviews. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);
```

1.2 *Search Functionality*

<img src="/movie-review/src/examples/SearchByTitle.png">

Users can search by `title`, `genre`, `director` and `year` using the `Search` component. The `handleSearch` function filters the movies array based on input.

```jsx
const handleSearch = (query, filterBy) => {
    const filtered = movies.filter((movie) =>
        movie[filterBy].toString().toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
};
```

**How does the Search component's logic work?**

We do have two states: 
- `search`: Stores the user’s search query.
- `filterBy`: Stores the selected field to search by (title, director, genre or year).

As the user types, `handleSearchChange` updates search and immediately calls `onSearch(search, filterBy)` to filter results in **real time**.

```jsx
const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        onSearch(value, filterBy);
    };
```

When the user selects a different field (like `director` or `genre`), `handleFilterChange` updates `filterBy` and re-applies the search.

```jsx
const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilterBy(value);
        onSearch(search, value);
    };
```

User Interface:
- Dropdown (`<select>`): Lets the user choose the search field.
- Text input (`<input>`): Lets the user type the search query.

<img src="/movie-review/src/examples/SearchByGenre.png">

1.3 *Connection Between `ReviewCard` component and `Home` Page*

The `ReviewCard` component represents individual movie reviews displayed on the `Home` page. Each movie review is passed as a prop to `ReviewCard` from the `Home` page, where the `filteredMovies` array holds the list of movies based on the search criteria. The `ReviewCard` component takes in the movie object, which includes information like the `title`, `genre`, `rating`, and `actors`.

In the `Home` page, a map function is used to display each movie as a `ReviewCard` component within a grid layout. Here's the key connection:

```jsx
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map((item) => (
            <ReviewCard key={item.id} movie={item} onDelete={handleDelete} />
        ))}
</div>
```

1.4 *Functionality of `Read More` Button in `ReviewCard`*

<img src="/movie-review/src/examples/ReadMore.png">

The `Read More` button in the `ReviewCard` allows users to navigate to a detailed page for a specific movie review. When the button is clicked, the navigate function from react-router-dom is called, which navigates the user to a page with more detailed information about that movie. 

```jsx
 <button onClick={() => navigate(`/reviews/${movie.id}`)} 
 className="px-3 py-2 bg-[#064E2D] text-[#A9CDE5] text-sm rounded-lg hover:bg-[#A9CDE5] transition duration-300 font-medium shadow-sm">
    Read more
</button>
```

The useEffect hook in this code snippet is used to fetch movie details when the component loads or when the id parameter (coming from the URL path `/reviews/${movie.id}`) changes.

```jsx
useEffect(() => {
        const fetchMovieReview = async () => {
            try {
                const data = await movieApi.getMovieById(id);
                setMovie(data);
            } catch (err) {
                setNotFound(true);
                console.error('An error loading:', err);
                setError('Failed to load review. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieReview();
    }, [id]);
```

<img src="/movie-review/src/examples/ReviewDetails.png">

2. **Crud Operations && API**

API Service for Moview-review Management:

This module implements functions to interact with a REST API hosted on MockAPI. These functions are used to fetch, create, update, and delete reviews in the application.

 - `axios` — for sending HTTP requests
 - `MockAPI` — used as a mock backend to simulate real API interactions


🌐 API Configuration

```js 
    const api = axios.create({
        baseURL: "https://681b800b17018fe5057bd095.mockapi.io/movie",
    })
```

src/api/movie/movie.js

```js
export const getMovies = async () => {
    const response = await api.get('/movie');
    return response.data;
};

export const getMovieById = async (id) => {
    const response = await api.get(`/movie/${id}`);
    return response.data;
};

export const createMovie = async (movie) => {
    const response = await api.post('/movie', movie);
    return response.data;
};

export const updateMovie = async (id, movie) => {
    const response = await api.put(`/movie/${id}`, movie);
    return response.data;
};

export const deleteMovie = async (id) => {
    await api.delete(`/movie/${id}`);
};
```


Fetching all reviews(`getMovies()`) and fetching the specific one(`getMovieById()`) were described below.

2.1 *Create or Update* 

The `POST` method is used to send new review data from the form to the server. When it happens: When there is no id in the URL (meaning the form is used to create a new review, not update).

`UseEffect()` hook is responsible for fetching data when the component is first loaded or when the id parameter changes. 

If an `id` exists (indicating the user is editing an existing review):
- The `fetchReviewData` function is called to fetch the data from the API (`movieApi.getMovieById(id)`).
- The fetched data is used to populate the form fields via the `reset()` method from react-hook-form.

**onSubmit Function:** This function handles form submissions and determines whether the user is creating or updating a review, based on the presence of the id.

For Updating a Review (**when id exists**):

If `id` is available, it means the user is editing an existing review. The `movieApi.updateMovie(id, data)` is called to update the review data with the new form data. If the update is successful, a success toast is shown with the message: `Review updated successfully!`. This toast auto-closes after 1000 ms.

<img src="/movie-review/src/examples/updated-successfully.png">

For Creating a Review (**when id doesn't exist**):

If `id` is not present, the form is being used to create a new review. An info toast (`toast.info`) is shown to the user with an `Undo` option, using the `UndoNotification` component.

The toast has two buttons:
- `Undo`: Cancels the creation of the review.
- `Create`: Proceeds with creating the review.

In the onClose callback of the toast:

If the user clicks `Undo`, a notification is shown (`toast.info`) saying `Review creation cancelled`. 

<img src="/movie-review/src/examples/cancelled.png">

If the user proceeds (i.e., clicks `Create`), the `movieApi.createMovie(data)` function is called to create a new review in the database. After a successful creation, a success message (`Review created successfully!`) is shown via a toast, and the form is reset using reset().

<img src="/movie-review/src/examples/created.png">

2.2 *Delete*

`await movieApi.deleteMovie(id)` sends a request to the backend to delete the movie with the given `id`. After successful deletion, it updates both `movies` and `filteredMovies` states by filtering out the deleted movie from the list (`item.id !== id`).

```jsx
    const handleDelete = async (id) => {
        try {
            await movieApi.deleteMovie(id);
            setMovies(movies.filter(item => item.id !== id));
            setFilteredMovies(movies.filter(item => item.id !== id));
        } catch (error) {
            console.error("On delete error", error);
        }
    };
```

3. **State Management with Redux Toolkit:**

3.1 *`favoritesSlice`*:
- Stores the list of favorite reviews in the Redux store under state.reviews.
- Initializes the state from `localStorage` (if available), so favorites persist across page reloads.
- Reducers:
    - `addToFavorites:` Adds a review if it’s not already in the favorites list, then saves the updated list to localStorage.
    - `removeFavorite:` Removes a review by its id and updates localStorage.
    - `clearFavorites:` Empties the favorites list and clears localStorage.    

```js
const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites(state, action) {
            const review = state.reviews.find(item => item.id === action.payload.id);
            if (!review) {
                state.reviews.push(action.payload);
                saveToLocalStorage(state.reviews);
            }
        },
        removeFavorite(state, action) {
            state.reviews = state.reviews.filter(item => item.id !== action.payload);
            saveToLocalStorage(state.reviews);
        },
        clearFavorites(state) {
            state.reviews = [];
            saveToLocalStorage([]);
        },
    },
});
```

3.2 *Adding Favorites in `ReviewCard` Component*

The heart button triggers `handleAdd`, which dispatches `addToFavorites(movie)` to the Redux store.

```jsx
const handleAdd = () => {
        dispatch(addToFavorites(movie));
    };
```

3.3 *Viewing and Managing Favorites in `Favorites` Page*

Uses `useSelector(selectFavorites)` to retrieve the list of favorite reviews. If no favorites exist, a message is shown (`No favorites yet.`). Each favorite displays the ` review title` and `review text`.

Users can:
- `Read More:` Navigate to the detailed review page.
- `Delete Favorite:` Dispatches removeFavorite to delete it from the list.
- `Clear Favorites:` Dispatches clearFavorites to remove all at once.

<img src="/movie-review/src/examples/favorites.png">

4. **Form and Form Validation**

4.1 I am using React Hook Form's `useFieldArray` to dynamically manage and render three sets of repeatable input fields: `Genre`, `Actor` and `Tag` fields.

*How do they work dynamically?*

On rendering, each field array is mapped using `.map()` to generate a list of inputs. Each field has a `key={field.id}` and is linked via `register(...)` with the correct indexed path (e.g., `genre.${index}`). You can add an input by calling `appendGenre("")`, `appendActor("")`, or `appendTag("")`. You can remove any entry using `removeGenre(index)`, `removeActor(index)`, or `removeTag(index)`.

```jsx 
const { fields: genreFields, append: appendGenre, remove: removeGenre } = useFieldArray({
        control,
        name: "genre",
    });

<div className="flex flex-col space-y-2">
<label className="text-lg font-semibold text-[#064E2D]" htmlFor="genre">Genre:</label>
    {genreFields.map((field, index) => (
        <div key={field.id} className="flex space-x-2 items-center">
            <input {...register(`genre.${index}`)} defaultValue={field.value} className="p-2 border border-gray-300 rounded-md flex-grow"/>
            {errors.genre && errors.genre[index] && (<p className="text-red-600 text-sm">{errors.genre[index].message}</p>)}
                <button type="button"
                        onClick={() => removeGenre(index)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md"
                        >
                        Delete
                </button>
        </div>
    ))}
                <button
                    type="button"
                    onClick={() => appendGenre("")}
                    className="mt-2 px-4 py-2 bg-[#A9CDE5] text-[#064E2D] rounded-md"
                >
                    Add Genre
                </button>
</div>
```

4.2 `Yup` 

Yup is a JavaScript library used to validate form data by defining a schema — a set of rules that your data must follow (like required fields, number ranges, string formats, etc.).

In short: Yup helps check if user input is correct before sending it anywhere.

```js
const schema = yup
    .object({
        title: yup
            .string()
            .required("The title is required!")
            .trim(),
    ...
    })
```

<img src="/movie-review/src/examples/validation.png">

## Source List 

1. [Git Course](https://github.com/MSU-Courses/development-of-web-application-with-react)

















