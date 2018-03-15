# Oh Mac OS X, why do you limit this?
# Fix for open file limit
ulimit -n 2048
ulimit -u 1024

# Load ~/.bash_prompt, ~/.exports, ~/.aliases, ~/.functions and ~/.extra
# ~/.extra can be used for settings you don’t want to commit
for file in ~/.dotfiles/.{bash_prompt,exports,aliases,functions,extra}; do
  [ -r "$file" ] && source "$file"
done
unset file

# Case-insensitive globbing (used in pathname expansion)
shopt -s nocaseglob

# Append history to file
shopt -s histappend

# Add tab completion for SSH hostnames based on ~/.ssh/config, ignoring wildcards
[ -e "$HOME/.ssh/config" ] && complete -o "default" -o "nospace" -W "$(grep "^Host" ~/.ssh/config | grep -v "[?*]" | cut -d " " -f2)" scp sftp ssh

# Add tab completion for `defaults read|write NSGlobalDomain`
# You could just use `-g` instead, but I like being explicit
complete -W "NSGlobalDomain" defaults

# RVM path setup
#[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm" # Load RVM function
#
#if [[ -s /Users/markwalz/.rvm/scripts/rvm ]] ; then
#    source /Users/markwalz/.rvm/scripts/rvm ;
#fi

# NVM Path Setup for Brew
[[ -s "/usr/local/opt/nvm/nvm.sh" ]] && . "/usr/local/opt/nvm/nvm.sh" # Load NVM function

if [[ -s $/usr/local/opt/nvm/nvm.sh ]] ; then
    source /usr/local/opt/nvm/nvm.sh ;
fi

# if brew
#    install git bash-completion
# else if Mac Ports
#   BASH Completion setup
#   sudo port install git-core +bash_completion
if [ -f `brew --prefix`/etc/bash_completion ]; then
    . `brew --prefix`/etc/bash_completion
elif [ -f /opt/local/etc/bash_completion ]; then
    . /opt/local/etc/bash_completion
fi

# if [ -f /opt/local/etc/profile.d/bash_completion.sh ]; then
#     . /opt/local/etc/profile.d/bash_completion.sh
# fi

# BASH Completion setup
# sudo port install git-core +bash_completion
# if [ -f /opt/local/etc/bash_completion ]; then
#     . /opt/local/etc/bash_completion
# fi

# Include Mutually Human tidbits Helper files
# source ~/.tidbits/mhsrc
export PATH="/usr/local/opt/mongodb@3.4/bin:$PATH"
