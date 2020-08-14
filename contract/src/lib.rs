// To conserve gas, efficient serialization is achieved through Borsh (http://borsh.io/)
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use serde::{Deserialize, Serialize};
use near_sdk::wee_alloc;
use near_sdk::{near_bindgen};
use std::collections::HashMap;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


#[derive(Debug, Clone, Default, BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
pub struct Idea {
    pub title: String,
    pub link: String,
    pub vote_count: u32
}

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
pub struct IdeaBankContract {
    ideas: HashMap<u64, Idea>,
}

#[near_bindgen]
impl IdeaBankContract {

    pub fn create_idea(&mut self, title: String, link: String) -> Option<Idea> {
        let idea_id = *self.ideas.keys().max().unwrap_or(&0u64) + 1;

        self.ideas.insert(
            idea_id,
            Idea {
                title,
                link,
                vote_count: 0
            },
        );
        match self.ideas.get(&idea_id) {
            Some(idea) => Some(idea.clone()),
            None => None
        }
    }

    // pub fn get_all_Ideas
    // pub fn upVote_idea
    // pub fn downVote_idea
}

/*
 * The rest of this file holds the inline tests for the code above
 * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
 *
 * To run from contract directory:
 * cargo test -- --nocapture
 *
 * From project root, to run in combination with frontend tests:
 * yarn test
 *
 */
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};

    // mock the context for testing, notice "signer_account_id" that was accessed above from env::
    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
        VMContext {
            current_account_id: "alice_near".to_string(),
            signer_account_id: "bob_near".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "carol_near".to_string(),
            input,
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view,
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }

    // #[test]
    // fn get_default_greeting() {
    //     let context = get_context(vec![], true);
    //     testing_env!(context);
    //     let contract = Welcome::default();
    //     // this test did not call set_greeting so should return the default "Hello" greeting
    //     assert_eq!(
    //         "Hello".to_string(),
    //         contract.get_greeting("francis.near".to_string())
    //     );
    // }
}
