import React, { useState, useEffect } from 'react';

const Tags = ({ tagsUpdated }) => {
  const tagChoices = [
    'node',
    'javascript',
    'react',
    'react-native',
    'digital-marketing',
    'devops',
  ];
  const [selectedTags, setSelectedTags] = useState([]);

  const tagChange = (e) => {
    const value = e.target.value;
    const alreadySelected = selectedTags.includes(value);
    if (e.target.checked && !alreadySelected) {
      setSelectedTags([...selectedTags, value]);
    } else if (!e.target.checked && alreadySelected) {
      setSelectedTags(selectedTags.filter((prevTag) => prevTag !== value));
    }
  };

  useEffect(() => {
    tagsUpdated(selectedTags);
  }, [selectedTags, tagsUpdated]);

  return (
    <>
      {tagChoices.map((choice, index) => (
        <label className="checkbox-inline mr-3" key={index}>
          <input type="checkbox" value={choice} onChange={tagChange} />
          {' ' + choice}
        </label>
      ))}
    </>
  );
};

export default Tags;
