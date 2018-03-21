# Oh Mac OS X, why do you limit this?
# Fix for open file limit
ulimit -n 2048
ulimit -u 1024

# Case-insensitive globbing (used in pathname expansion)
shopt -s nocaseglob

# Append history to file
shopt -s histappend

# Add tab completion for SSH hostnames based on ~/.ssh/config, ignoring wildcards
[ -e "$HOME/.ssh/config" ] && complete -o "default" -o "nospace" -W "$(grep "^Host" ~/.ssh/config | grep -v "[?*]" | cut -d " " -f2)" scp sftp ssh

# Add SSH keys to ssh-agent 
# See functions file for base function
# Client specific setups are in extra, where `setupssh` is called with a list of keys
if typeset -f setupssh > /dev/null ; then
  setupssh
fi

# Add tab completion for `defaults read|write NSGlobalDomain`
# You could just use `-g` instead, but I like being explicit
complete -W "NSGlobalDomain" defaults

# Brew bash_completion
# $ brew install bash-completion
if [ -f `brew --prefix`/etc/bash_completion ]; then
    . `brew --prefix`/etc/bash_completion
fi

if [ -f ~/.bashrc ]; then
   source ~/.bashrc
fi