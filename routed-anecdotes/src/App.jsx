import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";

import { useField } from "./hooks";
const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <a href="/" style={padding}>
        anecdotes
      </a>
      <a href="/create" style={padding}>
        create new
      </a>
      <a href="/about" style={padding}>
        about
      </a>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const AnecdoteExtended = ({ anecdotes }) => {
  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const id = useParams().id;

  const anecdoteById = (id) => anecdotes.find((a) => a.id === Number(id));

  let anecdote = anecdoteById(id);

  return (
    <div>
      <h2>Anecdote</h2>
      <p>{anecdote.content}</p>
      <p> {"From: " + anecdote.author}</p>
      <p> {"Have " + anecdote.votes + " votes"}</p>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const Notification = (props) => {
  if (props.notification) {
    return <div>{props.notification}</div>;
  }

  return <div></div>;
};

const CreateNew = (props) => {
  const content = useField("text");
  const contentInput = { ...content };
  delete contentInput.reset;

  const author = useField("text");
  const authorInput = { ...author };
  delete authorInput.reset;

  const info = useField("text");
  const infoInput = { ...info };
  delete infoInput.reset;

  const navigate = useNavigate();
  const { setNotification } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");

    setNotification("Anecdote added:" + content.value);
    setTimeout(() => {
      setNotification(false);
    }, 5000);
  };

  const resetHandle = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentInput} />
        </div>
        <div>
          author
          <input {...authorInput} />
        </div>
        <div>
          url for more info
          <input {...infoInput} />
        </div>
        <button>create</button>
        <button type="button" onClick={resetHandle}>
          {" "}
          reset{" "}
        </button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />

      <Notification notification={notification} />

      <Routes>
        <Route path="/about" element={<About />} />

        <Route
          path="/create"
          element={
            <CreateNew addNew={addNew} setNotification={setNotification} />
          }
        />
        <Route
          path="/anecdotes/:id"
          element={<AnecdoteExtended anecdotes={anecdotes} />}
        />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
