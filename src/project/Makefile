venv:
	test -d venv || python3.11 -m venv --copies venv && venv/bin/pip install -r requirements.txt

run: venv
	. venv/bin/activate && python3 retail/manage.py runserver 

create_models_from_db: venv
	. venv/bin/activate && python3 retail/manage.py inspectdb > retail/retail/models.py

tests: venv
	. venv/bin/activate && python3.10 -m unittest

# Создает файлы миграции на основе новыйх ОРМ моделей или зменениях в них
makemigrations: venv
	. venv/bin/activate && python3 retail/manage.py makemigrations

# Активирует файлы миграции на текущую базу данных
migrate: venv
	. venv/bin/activate && python3 retail/manage.py migrate --no-input

# Генерация статик файлов для фронтэнда
collectstatic: venv
	. venv/bin/activate && python3 retail/manage.py collectstatic --noinput

autopep8: venv
	. venv/bin/activate && find -type f -name '*.py' ! -path '*/venv/*' -exec autopep8 --in-place --aggressive --aggressive '{}' \;

clean:
	rm -rf venv dist *.egg-info
	find . -iname "*.pyc" -delete
	find . -iname "__pycache__" -delete

.PHONY: venv clean run autopep8