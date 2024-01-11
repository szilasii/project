-- https://dload-oktatas.educatio.hu/erettsegi/feladatok_2019tavasz_emelt/e_infma_19maj_fl.pdf

DROP DATABASE IF EXISTS piacok;



CREATE TABLE arusitohely (
	id INT,
	nev VARCHAR(30),
	tipus VARCHAR(30),
	megye VARCHAR(30),
	telepules VARCHAR(30),
	irszam INT,
	cim VARCHAR(30),
	PRIMARY KEY (id)
);


CREATE TABLE nap (
	id INT,
	nev VARCHAR(30),
	PRIMARY KEY (id)
);

CREATE TABLE nyitvatartas (
	helyid INT,
	napid INT,
	FOREIGN KEY (helyid) REFERENCES arusitohely (id),
	FOREIGN KEY (napid) REFERENCES nap (id)
);
