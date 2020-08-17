const trip = {
  id: "",
  name: "",
  origin: {lat: 40.7822222, lon: -73.9811111},
  itinerary:[
    [
      {
        start: "10AM", 
        end: "1PM", 
        place: {
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
        }
      },
      {
        start: "1:30PM", 
        end: "4:30PM", 
        place: {
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
      },
      {
        start: "5PM", 
        end: "7PM", 
        place: {
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
      }
    ],
    [
      {
        start: "10AM", 
        end: "1PM", 
        place: {
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
        }
      },
      {
        start: "1:30PM", 
        end: "4:30PM", 
        place: {
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
      },
      {
        start: "5PM", 
        end: "7PM", 
        place: {
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
      }
    ],
    [
      {
        start: "10AM", 
        end: "1PM", 
        place: {
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
        }
      },
      {
        start: "1:30PM", 
        end: "4:30PM", 
        place: {
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
      },
      {
        start: "5PM", 
        end: "7PM", 
        place: {
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
      }
    ]
  ]

}

export default trip;