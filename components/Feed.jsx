"use client";

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt, i) => (
        <PromptCard
          key={prompt._id}
          post={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )

}

const Feed = () => {

  const [allPosts, setAllPosts] = useState([]);
  const [searchTImeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  // const [posts, setPosts] = useState([]);



  const filterPrompts = (searchText) => {

    const regex = new RegExp(searchText, 'i');

    return allPosts.filter((post) => regex.test(post.creator.username) || regex.test(post.tag) || regex.test(post.prompt));

  }

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterPrompts(e.target.value);
        setSearchResults(searchResults);
      }, 500)
    )

  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const searchResults = filterPrompts(tag);
    setSearchResults(searchResults);
  }

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('api/prompt');
      const data = await response.json();
      setAllPosts(data);
    }
    fetchPost();
  }, []);

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          name="search"
          placeholder='Search for a tag or a username to find prompts'
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {
        searchText ? (
          <PromptCardList
            data={searchResults}
            handleTagClick={handleTagClick}
          />) : (
          <PromptCardList
            data={allPosts}
            handleTagClick={() => { }}
          />
        )
      }
    </section>
  )
}

export default Feed
