Git workflow for Hangry:
     (Getting Started)
     git remote add upstream “place og project url—master”  “Add orgs version of the repo as an upstream remote"
     git checkout master (ensures you are on master)
     git pull —rebase upstream master (always do first to ensure you repo is in synch w/ master)
     git checkout -b ui-branch-cox (create a branch (ui-branch-cox is named whatever you want))

     (In progress, when in branch)
     git pull —rebase upstream master (always do first to ensure you repo is in synch w/ master)
     git status
     git add .
     git commit -m “commit message"
     git push origin ui-branch-cox (push changes))
     git pull —rebase upstream master (always do first to ensure you repo is in synch w/ master)

    (If merge is accepted by teammates)
    git checkout master (go back to main brach)
    git branch -d ui-branch-cox (deletes branch-cox whatever your repo name is)

    (If merge is not accepted by teammates)
    git checkout ui-branch-cox (via terminal enters branch (ui-branch-cox is named whatever you want))
    git branch -d ui-branch-cox (deletes branch-cox whatever your repo name is)
    git push origin ui-branch-cox (push changes to already open pull request))