async function Get_views(videoId) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${Bun.env.YoutubeAPI}`
    );
    const data = await response.json();
    const Views = data.items[0].statistics.viewCount;
    return Views;

  } catch (error) {

    console.error("Error fetching views:", error);
    return Views; // Return 0 or some default value in case of an error
  }
}

async function Get_video_title(videoId) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${Bun.env.YoutubeAPI}`
    );
    const data = await response.json();
    const title = data.items[0].snippet.title;
    return title;
  } catch (error) {
    console.error("Error fetching video title:", error);
    return null; 
  }
}

function getYouTubeID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return null;
  }
}

async function Get_Data(url) {
  
  const ID = getYouTubeID(url)
  
  const Title = await Get_video_title(ID)
  const Views = await Get_views(ID)

  return [Title,Views];
}

// Export the function
module.exports = Get_Data;
