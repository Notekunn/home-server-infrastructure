all: 

install: prerequisites
	sudo chmod +x ./prerequisites/install.bash
	./prerequisites/install.bash