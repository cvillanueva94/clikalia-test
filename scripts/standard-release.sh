
#!/bin/bash

target_branch=$1
current_branch=$(git rev-parse --abbrev-ref HEAD)
dev_branch=dev

if [ -z $target_branch ]; then
  echo "Se requiere el parametro target_branch: rama en la que se realizara el release (version,CHANGELOG, & git TAG)"
  exit 1
else 
  echo "El realease esta configuardo para ejecutarse en la rama: ${target_branch}"
fi

if [[ -z $(git log origin/$(git branch --show-current)..HEAD) ]]; then
  echo "No hay commits por subir a origin/${current_branch}, abortando release."
  exit 0
else
  echo "Hay commits por subir a origin/${current_branch}."
fi


if [ $current_branch = $target_branch ]; then 
  echo "Se ejecutara el release en la rama: ${current_branch}"
  # hacemos el release con commit de los cambios y mensaje personalizado para que no este la cadena [skip ci]
  # ya que esta cadena (en el mensaje por defecto) hace que se le haga skip al workflow de este commit en gitlab
  npx standard-version --commit-all --releaseCommitMessageFormat 'chore(release): {{currentTag}}'

  echo "Realizando push a la rama origin ${current_branch}"
  git push --follow-tags origin $current_branch

  # Cambia a la rama dev
  git checkout $dev_branch

  # Obtiene el hash del último commit de la rama staging
  last_commit=$(git rev-parse $target_branch)

  # Aplica el último commit de la rama staging a la rama dev (de esta forma se actualiza version y changelog en dev)
  git cherry-pick -Xtheirs $last_commit # se puede usr ademas -Xtheirs --strategy-option=theirs para forzarla estrategia de solucion de conflicto a theirs

  exit 0;
else 
  echo "Se saltara el release en la rama: ${current_branch}";
  echo "Realizando push a la rama origin/${current_branch}"
  git push
  exit 0; 
fi