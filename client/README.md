/* index.css */
/* body {
  font-family: 'gothic';
} */
/* Style for navbar brand */
.navbar {
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  color: white;
  background-color: black;
  gap: 30px;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
}

.search-logo {
  width: 24px;
  height: 24px
}

/* Style for dropdown button */
#coursesMenuButton {
  background-color: #D83CFF; /* Tailwind color: 'gray-700' */
  border-radius: 0.375rem; /* Equivalent to Tailwind 'rounded-md' */
  padding: 0.5rem 1rem; /* Equivalent to Tailwind 'px-4 py-2' */
}

/* Style for dropdown menu */
#coursesMenu {
  right: 0; /* Align dropdown to the right */
}

/* Style for dropdown items */
#coursesMenu a {
  padding: 0.5rem 1rem; /* Equivalent to Tailwind 'px-4 py-2' */
  color: #1a202c; /* Tailwind color: 'gray-800' */
}

#coursesMenu a:hover {
  background-color: #cbd5e0; /* Tailwind color: 'gray-300' */
}

/* Style for search input */
input[type="search"] {
  border-radius: 0.375rem; /* Equivalent to Tailwind 'rounded-md' */
  border: 1px solid #e2e8f0; /* Tailwind color: 'gray-300' */
  padding: 0.5rem 1rem; /* Equivalent to Tailwind 'px-4 py-2' */
}

input[type="search"]:focus {
  outline: none;
  border-color: #667eea; /* Tailwind color: 'indigo-400' */
}

/* Style for search button */
button[type="submit"] {
  border-radius: 0.375rem; /* Equivalent to Tailwind 'rounded-md' */
  padding: 0.5rem 1rem; /* Equivalent to Tailwind 'px-4 py-2' */
  background-color: #667eea; /* Tailwind color: 'indigo-500' */
}

button[type="submit"]:hover {
  background-color: #5a67d8; /* Tailwind color: 'indigo-600' */
}

{/**
<div
      className="text-black dark:text-gray-400 dark:hover:text-gray-200 flex items-center cursor-pointer relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Classes
      <img src={arrow}
        className={`h-3 w-3 ml-1 mt-1 border transition-transform duration-300 transform ${
          showPopover ? 'hover:translate-x-2 hover:rotate-90' : ''
        } duration-200`}
        alt="Arrow" />
        {showPopover && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-2">
              {/* Popover content */}
              {/* Replace this with your popover content */}
            </div>
          )}
    </div>


**/}