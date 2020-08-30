Near Ideas
==================
Near dApp where people can post their ideas.


Public webpage: https://djuanit0x.github.io/nearideas

Exploring The Code
==================

1. The "backend" code lives in the `/contract` folder. This code gets deployed to
   the NEAR blockchain when you run `yarn deploy:contract`.
2. The frontend code lives in the `/src` folder. `/src/index.html` is a great
   place to start exploring. Note that it loads in `/src/index.js`.

Contract
==================
## Contract Methods

### View Methods
`get_all_ideas(&self) -> &HashMap<u64, Idea>`

Returns all ideas as JSON object.

`get_deposits_by_idea(&self, idea_id: u64) -> Option<Vec<Deposit>>`

Returns all deposits made on an idea by `idea_id`.

`get_deposits_by_owner(&self, account_id: String) -> Option<Deposit>`

Returns all deposits made on all ideas by `account_id`.

### Mutator Methods
`create_idea(&mut self, title: String, link: String) -> Option<Idea>`

Create an idea with title and link to the project that actually do the idea.

`upvote_idea(&mut self, idea_id: u64) -> &Idea`

Upvote an idea by one. Users need to deposit at least 10 Ⓝ to vote the idea.

## Contract States
`deposits_by_ideas`: HashMap<u64, Vec<Deposit>> - All deposits on an idea.

`deposits_by_owners`: HashMap<String, Deposit> - All ideas upvoted/deposited by the account id.

`ideas`: HashMap<u64, Idea> - All ideas on the blockchain.


### Deposit
- `owner_account_id`: String - Account id of the depositor.
- `amount`: u128 - Amount of deposit.

### Idea
- `idea_id`: u64 - The id of the idea. Starting from 1 and increment by 1 for every new idea.
- `title`: String - The title of your idea.
- `owner_account_id`: String - Account id that creates the idea.
- `link`: String - The link to a project that actually do the idea.
- `vote_count`: u32 - Number of votes on the idea.
