// To conserve gas, efficient serialization is achieved through Borsh (http://borsh.io/)
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::wee_alloc;
use near_sdk::{env, near_bindgen};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

const MIN_DEPOSIT_AMOUNT: u128 = 10_000_000_000_000_000_000_000_000;

#[derive(Debug, Clone, Default, BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
pub struct Idea {
    pub idea_id: u64,
    pub title: String,
    pub owner_account_id: String,
    pub link: String,
    pub vote_count: u32,
}

type Deposits = HashMap<String, u128>;

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
pub struct IdeaBankContract {
    deposits: Deposits,
    ideas: HashMap<u64, Idea>,
}

fn add_deposit(deposits: &mut Deposits, account_id: String, deposit_amount: u128) {
    *deposits.entry(account_id).or_insert(0) += deposit_amount;
}

#[near_bindgen]
impl IdeaBankContract {
    pub fn create_idea(&mut self, title: String, link: String) -> Option<Idea> {
        let idea_id = *self.ideas.keys().max().unwrap_or(&0u64) + 1;

        self.ideas.insert(
            idea_id,
            Idea {
                idea_id,
                owner_account_id: env::signer_account_id().clone(),
                title,
                link,
                vote_count: 0,
            },
        );
        match self.ideas.get(&idea_id) {
            Some(idea) => Some(idea.clone()),
            None => None,
        }
    }

    // pub fn get_all_Ideas
    pub fn get_all_ideas(&self) -> &HashMap<u64, Idea> {
        &self.ideas
    }

    #[payable]
    pub fn upvote_idea(&mut self, idea_id: u64) -> &Idea {
        let deposit_sender_amount: u128 = env::attached_deposit();
        let sender_account_id: String = env::signer_account_id();

        // To do: check this assertion
        assert!(
            deposit_sender_amount >= MIN_DEPOSIT_AMOUNT,
            "The amount of deposit is {} and it should be greater than equal to {}",
            deposit_sender_amount,
            MIN_DEPOSIT_AMOUNT
        );

        let idea = self.ideas.get_mut(&idea_id).unwrap();
        idea.vote_count += 1;

        add_deposit(
            &mut self.deposits,
            sender_account_id.clone(),
            deposit_sender_amount,
        );

        return idea;
    }
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
    use near_sdk::{testing_env, AccountId, VMContext};

    fn alice() -> AccountId {
        "alice".to_string()
    }

    fn bob() -> AccountId {
        "bob".to_string()
    }

    fn eve() -> AccountId {
        "eve".to_string()
    }

    // mock the context for testing, notice "signer_account_id" that was accessed above from env::
    fn get_context(signer_account_id: AccountId, deposit_amount: u128) -> VMContext {
        VMContext {
            current_account_id: "owner".to_string(),
            signer_account_id,
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "previous_owner".to_string(),
            input: vec![],
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit: deposit_amount,
            is_view: false,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }

    #[test]
    fn alice_can_create_idea() {
        let context = get_context(alice(), MIN_DEPOSIT_AMOUNT);
        testing_env!(context);

        let mut contract = IdeaBankContract::default();
        let title = "Near Kitties".to_string();
        let link = "http://www.cryptokitties.co/".to_string();

        let idea: Idea = contract.create_idea(title.clone(), link.clone()).unwrap();

        assert_eq!(title, idea.title);
        assert_eq!(link, idea.link);
        assert_eq!(contract.ideas.len(), 1);
    }

    #[test]
    fn eve_can_vote_bob_idea() {
        let context = get_context(eve(), MIN_DEPOSIT_AMOUNT);
        testing_env!(context);

        let mut contract = IdeaBankContract::default();
        let title = "A gambling gaming platform".to_string();
        let link = "https://www.247freepoker.com/".to_string();

        contract.ideas.insert(
            1,
            Idea {
                idea_id: 1,
                title,
                link,
                vote_count: 0,
                owner_account_id: bob().clone(),
            },
        );

        let idea = contract.upvote_idea(1);
        assert_eq!(idea.vote_count, 1);
        assert_eq!(
            contract.deposits.get(&eve()).unwrap().clone(),
            MIN_DEPOSIT_AMOUNT
        );
    }
}
