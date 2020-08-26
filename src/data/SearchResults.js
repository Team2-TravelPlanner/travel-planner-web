const searchResults = {
  currentPageNumber: 1,
  totalPageNumber: 1,
  places:[
    {
      id: "1",
      name: "Chrysler Building",
      address: "405 Lexington Ave, New York, NY 10174",
      lat: 40.7514906,
      lon: -73.974861,
      category: "Building",
      businessHours: [
        {day: "Monday", open: "8AM", close: "6PM"},
        {day: "Tuesday", open: "8AM", close: "6PM"},
        {day: "Wednesday", open: "8AM", close: "6PM"},
        {day: "Thursday", open: "8AM", close: "6PM"},
        {day: "Friday", open: "8AM", close: "6PM"}
      ],
      rating: {score: 4.6, count: 4026},
      info: "Shimmering art deco skyscraper from 1930 whose spire once made it the world's tallest building.",
      imageUrl: "https://lh5.googleusercontent.com/p/AF1QipMNhSRiLtJe65bQ1matZnf-EgFSrvTjRe-elEZh=w408-h725-k-no",
      website: "http://www.tishmanspeyer.com/properties/chrysler-center",
      averageTimeSpent: 1
    },
    {
      id: "2",
      name: "Times Square",
      address: "Manhattan, NY 10036",
      lat: 40.757046,
      lon: -73.9859724,
      category: "Plaza",
      businessHours: [
        {day: "Monday", open: "9AM", close: "8PM"},
        {day: "Tuesday", open: "9AM", close: "8PM"},
        {day: "Wednesday", open: "9AM", close: "8PM"},
        {day: "Thursday", open: "9AM", close: "8PM"},
        {day: "Friday", open: "9AM", close: "8PM"},
        {day: "Saturday", open: "9AM", close: "8PM"},
        {day: "Sunday", open: "9AM", close: "8PM"}
      ],
      rating: {score: 4.7, count: 153222},
      info: "Bustling destination in the heart of the Theater District known for bright lights, shopping & shows.",
      imageUrl: "https://lh5.googleusercontent.com/p/AF1QipN-y2KtE8aHWR2a7IGsIjKaQ1Ech3FmpByST25w=w408-h271-k-no",
      website: "http://timessquarenyc.org/",
      averageTimeSpent: 2
    },
    {
      id: "3",
      name: "Central Park",
      address: "New York, NY",
      lat: 40.7823234,
      lon: -73.9654161,
      category: "Park",
      businessHours: [
        {day: "Monday", open: "6AM", close: "1AM"},
        {day: "Tuesday", open: "6AM", close: "1AM"},
        {day: "Wednesday", open: "6AM", close: "1AM"},
        {day: "Thursday", open: "6AM", close: "1AM"},
        {day: "Friday", open: "6AM", close: "1AM"},
        {day: "Saturday", open: "6AM", close: "1AM"},
        {day: "Sunday", open: "6AM", close: "1AM"}
      ],
      rating: {score: 4.8, count: 206928},
      info: "Sprawling park with pedestrian paths & ballfields, plus a zoo, carousel, boat rentals & a reservoir.",
      imageUrl: "https://lh5.googleusercontent.com/p/AF1QipNK7c3XdSDpNsGLGagghHU0RemedWueP2viE6le=w408-h510-k-no",
      website: "http://www.centralparknyc.org/",
      averageTimeSpent: 3
    },
    {
      id: "4",
      name: "Grand Central Terminal",
      address: "89 E 42nd St, New York, NY 10017",
      lat: 40.7531573,
      lon: -73.9765276,
      category: "Train Station",
      businessHours: [],
      rating: {score: 4.7, count: 5054},
      info: "Iconic train station known for its grand facade & main concourse, also offering shops & dining.",
      imageUrl: "https://lh5.googleusercontent.com/p/AF1QipObgGghBwtIt1CVHQwWOLYBFpKoM0WsPYgirman=w426-h240-k-no",
      website: "https://www.grandcentralterminal.com/",
      averageTimeSpent: 1
    },
    {
      id: "5",
      name: "The Metropolitan Museum of Art",
      address: "1000 5th Ave, New York, NY 10028",
      lat: 40.7795457,
      lon: -73.962916,
      category: "Art museum",
      businessHours: [
        {day: "Monday", open: "9AM", close: "8PM"},
        {day: "Tuesday", open: "9AM", close: "8PM"},
        {day: "Wednesday", open: "9AM", close: "8PM"},
        {day: "Thursday", open: "9AM", close: "8PM"},
        {day: "Friday", open: "9AM", close: "8PM"},
        {day: "Saturday", open: "9AM", close: "8PM"},
        {day: "Sunday", open: "9AM", close: "8PM"}
      ],
      rating: {score: 4.8, count: 59537},
      info: "A grand setting for one of the world's greatest collections of art, from ancient to contemporary.",
      imageUrl: "https://lh5.googleusercontent.com/p/AF1QipNmUfhW-FZr8N7XLX8wK06X_z0JfnuXrp-S1SZh=w408-h306-k-no",
      website: "https://www.metmuseum.org/",
      averageTimeSpent: 3
    }
  ]
}

export default searchResults;

