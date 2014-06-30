window.DICTIONARY = { //json?
  "nouns": {},

  "pronouns": {
    "singular": {
      "personal": new Set([
        "i", "me", "you", "he", "him", "she", "her", "it"
      ]),
      "demonstrative": new Set([
        "that", "this"
      ]),
      "posessive": new Set([
        "mine", "yours", "his", "hers"
      ])
    },
    "plural": {
      "personal": new Set([
        "we", "us", "they", "them"
      ]),
      "demonstrative": new Set([
        "those", "these"
      ]),
      "posessive": new Set([
        "ours", "yours", "theirs"
      ])
    }
  },

  "adjectives": {},

  "verbs": {
    "past": {},
    "present": {},
    "future": {}
  },

  "adverbs": {},

  "articles": {
    "definite": "the",
    "indefinite": new Set([
      "a", "an", "some"
    ])
  }

  "prepositions": new Set(),

  "conjunctions": {
    "coordinating": new Set([
      "and", "but", "or", "nor", "for", "yet", "so"
    ]),
    "subordinating": new Set([
       "although", "because", "since", "unless"
    ])
  },

  "interjections": new Set()
}
