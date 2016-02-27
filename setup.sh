#!/usr/bin/env bash

TIMESTAMP=`date +"%m_%d_%Y_%T"`
BACKUP_DIR=~/"dotfile_backup_"$TIMESTAMP

# Copy existing dot files to backup directory
function backup_dot_file() {
  if [ ! -d "$BACKUP_DIR" ]; then
    echo "Making backup directory at: "$BACKUP_DIR
    echo
    mkdir $BACKUP_DIR
  fi

  echo "Backing up "$1" to "$BACKUP_DIR"/"$2
  mv $1 $BACKUP_DIR
}

# Copy our .dotfiles files to root with links back
for file in ~/.dotfiles/.{bash_profile,bashrc,inputrc,gitconfig,gitignore}; do
  if [ -f "$file" ]; then
    file_name=$(basename $file)
    root_file=~/$file_name

    if [ -f "$root_file" ]; then
      backup_dot_file $root_file $file_name
    fi

    echo "Creating link to "$file
    echo
    ln -s  $file $root_file
  fi
done
