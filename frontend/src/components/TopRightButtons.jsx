import React from 'react';

function TopRightButtons({ darkMode, toggleDarkMode }) {
  const writeReview = () => {
    const review = window.prompt('Please write your review:');
    if (review) {
      console.log('User review:', review);
      alert('Thank you for your review!');
    }
  };

  return (
    <div className="top-right-buttons">
      <button onClick={toggleDarkMode} className="button">
        {darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
      </button>
      <button onClick={writeReview} className="button">
        Write a Review
      </button>
    </div>
  );
}

export default TopRightButtons;