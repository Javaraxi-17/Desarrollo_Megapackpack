db-start:
	docker run -d -p 1522:1521 -e ORACLE_PASSWORD=12345678 -v oracle-volume:/opt/oracle/oradata gvenzl/oracle-free