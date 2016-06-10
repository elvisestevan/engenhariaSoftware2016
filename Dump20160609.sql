-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tgfatec
-- ------------------------------------------------------
-- Server version	5.7.13-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artefatos`
--

DROP TABLE IF EXISTS `artefatos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artefatos` (
  `idartefatos` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(256) NOT NULL,
  `ativo` tinyint(4) NOT NULL DEFAULT '1',
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idartefatos`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artefatos`
--

LOCK TABLES `artefatos` WRITE;
/*!40000 ALTER TABLE `artefatos` DISABLE KEYS */;
INSERT INTO `artefatos` VALUES (1,'Caso de Uso 1',1,'2015-12-12 11:21:21'),(2,'Diagrama Entidade-Relacionamento',1,'2015-12-12 04:02:42'),(3,'Matriz de Risco',1,'2015-12-12 04:03:02'),(4,'Especificacao Funcional',1,'2016-06-08 19:15:33'),(5,'Diagrama de Classe 1',1,'2016-06-09 19:42:54'),(6,'Teste',1,'2016-06-09 19:49:06');
/*!40000 ALTER TABLE `artefatos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artefatosstatus`
--

DROP TABLE IF EXISTS `artefatosstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artefatosstatus` (
  `artefatos_idartefatos` int(10) unsigned NOT NULL,
  `status_idstatus` int(10) unsigned NOT NULL,
  PRIMARY KEY (`artefatos_idartefatos`,`status_idstatus`),
  KEY `fk_artefatos_has_status_status1_idx` (`status_idstatus`),
  KEY `fk_artefatos_has_status_artefatos1_idx` (`artefatos_idartefatos`),
  CONSTRAINT `fk_artefatos_has_status_artefatos1` FOREIGN KEY (`artefatos_idartefatos`) REFERENCES `artefatos` (`idartefatos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_artefatos_has_status_status1` FOREIGN KEY (`status_idstatus`) REFERENCES `status` (`idstatus`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artefatosstatus`
--

LOCK TABLES `artefatosstatus` WRITE;
/*!40000 ALTER TABLE `artefatosstatus` DISABLE KEYS */;
INSERT INTO `artefatosstatus` VALUES (1,2),(2,2),(3,2),(4,2),(5,2),(6,2);
/*!40000 ALTER TABLE `artefatosstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produtos` (
  `idprodutos` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(256) NOT NULL,
  `ativo` tinyint(4) NOT NULL DEFAULT '1',
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idprodutos`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'ERP',1,'2015-12-12 03:47:05'),(2,'WMS',1,'2015-12-12 03:47:12'),(3,'TG',1,'2015-12-12 11:45:37'),(4,'TMS',1,'2016-06-09 20:00:31');
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projetos`
--

DROP TABLE IF EXISTS `projetos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projetos` (
  `idprojetos` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(256) NOT NULL,
  `ativo` tinyint(4) NOT NULL DEFAULT '1',
  `dataInicio` date DEFAULT NULL,
  `prazoEstimado` date DEFAULT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `produtos_idprodutos` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idprojetos`),
  KEY `fk_projetos_produtos1_idx` (`produtos_idprodutos`),
  CONSTRAINT `fk_projetos_produtos1` FOREIGN KEY (`produtos_idprodutos`) REFERENCES `produtos` (`idprodutos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projetos`
--

LOCK TABLES `projetos` WRITE;
/*!40000 ALTER TABLE `projetos` DISABLE KEYS */;
INSERT INTO `projetos` VALUES (1,'Módulo Inventário',1,'2016-01-01','2017-01-01','2015-12-12 11:16:53',2),(2,'TG Parte 2',1,'2016-01-01','2016-07-31','2015-12-12 11:46:10',3),(3,'TG Parte 3',1,'2016-01-01','2016-02-02','2016-06-09 20:36:26',1),(4,'TG Parte 4',1,'2016-01-02','2016-02-03','2016-06-09 20:36:58',3);
/*!40000 ALTER TABLE `projetos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `idstatus` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ordem` int(10) NOT NULL,
  `nome` varchar(256) NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idstatus`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,1,'Aberta','2015-12-12 04:24:17'),(2,2,'Fechada','2015-12-12 04:24:26'),(3,3,'Em Andamento','2015-12-12 04:24:34');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statustarefas`
--

DROP TABLE IF EXISTS `statustarefas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statustarefas` (
  `tarefas_idtarefas` int(10) unsigned NOT NULL,
  `status_idstatus` int(10) unsigned NOT NULL,
  `dataHora` datetime NOT NULL,
  `observacao` varchar(256) NOT NULL,
  PRIMARY KEY (`tarefas_idtarefas`,`status_idstatus`),
  KEY `fk_tarefas_has_status_status1_idx` (`status_idstatus`),
  KEY `fk_tarefas_has_status_tarefas_idx` (`tarefas_idtarefas`),
  CONSTRAINT `fk_tarefas_has_status_status1` FOREIGN KEY (`status_idstatus`) REFERENCES `status` (`idstatus`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tarefas_has_status_tarefas` FOREIGN KEY (`tarefas_idtarefas`) REFERENCES `tarefas` (`idtarefas`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statustarefas`
--

LOCK TABLES `statustarefas` WRITE;
/*!40000 ALTER TABLE `statustarefas` DISABLE KEYS */;
/*!40000 ALTER TABLE `statustarefas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarefas`
--

DROP TABLE IF EXISTS `tarefas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tarefas` (
  `idtarefas` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(256) NOT NULL,
  `descricao` varchar(256) DEFAULT NULL,
  `dataInicioEstimada` date DEFAULT NULL,
  `dataFimEstimada` date DEFAULT NULL,
  `dataInicioReal` date DEFAULT NULL,
  `dataFimReal` date DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT '1',
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarios_idusuarios` int(10) unsigned NOT NULL DEFAULT '1',
  `projetos_idprojetos` int(10) unsigned NOT NULL,
  `status_idstatus` int(10) unsigned DEFAULT '1',
  PRIMARY KEY (`idtarefas`),
  KEY `fk_tarefas_usuarios1_idx` (`usuarios_idusuarios`),
  KEY `fk_tarefas_projetos1_idx` (`projetos_idprojetos`),
  CONSTRAINT `fk_tarefas_projetos1` FOREIGN KEY (`projetos_idprojetos`) REFERENCES `projetos` (`idprojetos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tarefas_usuarios1` FOREIGN KEY (`usuarios_idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarefas`
--

LOCK TABLES `tarefas` WRITE;
/*!40000 ALTER TABLE `tarefas` DISABLE KEYS */;
INSERT INTO `tarefas` VALUES (6,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(7,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(8,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(9,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(11,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,2),(12,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,2),(13,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(14,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(18,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-06-09','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(19,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-06-09','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(20,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-06-09','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(21,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-06-09','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(22,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(23,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(24,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-06-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(25,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-06-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(33,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-06-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(34,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(35,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(36,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(37,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(38,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(39,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(40,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(41,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(42,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(43,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(44,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(45,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(46,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(47,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1),(48,'Tarefa Teste','Tarefa Teste','2016-01-01','2016-01-01','2016-01-01','2016-01-01',1,'2016-06-09 21:11:54',3,2,1);
/*!40000 ALTER TABLE `tarefas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `idusuarios` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(256) NOT NULL,
  `login` varchar(128) NOT NULL,
  `senha` varchar(256) NOT NULL,
  `token` varchar(2048) DEFAULT NULL,
  `roles` varchar(256) NOT NULL,
  `ultimoLogin` datetime DEFAULT NULL,
  `alteraSenha` tinyint(4) NOT NULL DEFAULT '0',
  `email` varchar(256) NOT NULL,
  `ativo` tinyint(4) NOT NULL DEFAULT '1',
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idusuarios`),
  UNIQUE KEY `usuario_UNIQUE` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Elvis Estevan','elvis.estevan','310890','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVzdWFyaW9zIjoxLCJub21lIjoiRWx2aXMgRXN0ZXZhbiIsImxvZ2luIjoiZWx2aXMuZXN0ZXZhbiIsInRva2VuIjpudWxsLCJlbWFpbCI6ImVsdmlzLmVzdGV2YW42NUBnbWFpbC5jb20iLCJhdGl2byI6MSwiaWF0IjoxNDY1NDA3NDQ1fQ.YW-k2hGUvelBsHyb1Ol4KeQb_QMYSDiuZaPINIrxcQE','DEV, GERENTE','2016-06-09 17:22:34',0,'elvis.estevan65@gmail.com',1,'2015-11-14 02:00:00'),(3,'Pedro','pedro.goncalves','123456',NULL,'DEV','2015-11-14 00:00:00',0,'pgoncalves2013@gmail.com',1,'2015-11-14 02:00:00'),(4,'Willy','willy.henrique','123456',NULL,'DEV','2015-11-14 00:00:00',0,'willy@gmail.com',1,'2015-11-14 02:00:00'),(5,'Jadir','jadir','123456',NULL,'DEV','2015-11-14 00:00:00',0,'jadir@jadir.com.br',1,'2015-11-14 02:00:00'),(22,'Luciana','luciana.moreira','123456','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVzdWFyaW9zIjoyMiwibm9tZSI6Ikx1Y2lhbmEiLCJsb2dpbiI6Imx1Y2lhbmEubW9yZWlyYSIsInRva2VuIjpudWxsLCJlbWFpbCI6Imx1Y2lhbmFndWFyZUBob3RtYWlsLmNvbSIsImF0aXZvIjoxLCJpYXQiOjE0NjU0MTk3NzV9.YH-wlO85IE0R11YwQx6NxDjzOsBRhp3lN6xzyH8vAI4','DEV','2016-06-09 14:32:02',1,'lucianaguare@hotmail.com',1,'2016-06-08 18:53:34'),(23,'Teste 123','teste123','1234567',NULL,'DEV, GERENTE',NULL,1,'teste@teste',1,'2016-06-09 18:06:44'),(24,'Teste 4','teste4','teste4',NULL,'DEV',NULL,1,'teste4@teste3',1,'2016-06-09 18:08:24'),(25,'Teste 5','teste5','teste5',NULL,'DEV',NULL,1,'teste5@teste',1,'2016-06-09 18:09:32'),(26,'Teste 6','teste6','teste6',NULL,'DEV, GERENTE',NULL,1,'teste6@teste',1,'2016-06-09 18:10:32'),(27,'Teste 7','teste 7','teste7',NULL,'DEV, GERENTE',NULL,1,'teste7@teste',1,'2016-06-09 18:11:23'),(28,'Teste 8','teste8','teste8',NULL,'DEV, GERENTE',NULL,1,'teste8@teste',1,'2016-06-09 18:11:56'),(29,'Teste 9','teste9','teste9',NULL,'DEV, GERENTE',NULL,1,'teste9@teste',1,'2016-06-09 18:12:45'),(30,'Teste 10','teste10','teste10',NULL,'DEV, GERENTE',NULL,1,'teste10@teste',1,'2016-06-09 18:15:28'),(31,'Teste 11','teste11','teste11',NULL,'DEV, GERENTE',NULL,1,'teste11@teste',1,'2016-06-09 18:16:09'),(32,'Teste 12','teste12','teste12',NULL,'DEV, GERENTE',NULL,1,'teste12@teste',1,'2016-06-09 18:18:02'),(33,'Teste 13','teste13','teste13',NULL,'DEV, GERENTE',NULL,1,'teste13@teste',1,'2016-06-09 18:19:06'),(34,'Teste 14','teste14','teste14',NULL,'DEV, GERENTE',NULL,1,'teste14@teste',1,'2016-06-09 18:26:13'),(35,'Teste 15','teste15','teste15',NULL,'DEV, GERENTE',NULL,1,'teste15@teste',1,'2016-06-09 18:27:49'),(36,'Teste 16','teste16','teste16',NULL,'DEV, GERENTE',NULL,1,'teste16@teste',1,'2016-06-09 18:30:42'),(37,'Teste 17','teste17','teste17',NULL,'DEV, GERENTE',NULL,1,'teste17@teste',1,'2016-06-09 18:31:22'),(38,'Teste 18','teste18','teste18',NULL,'DEV',NULL,1,'teste18@teste',1,'2016-06-09 18:37:23'),(39,'Teste 19','teste19','teste19',NULL,'DEV',NULL,1,'teste19@teste',1,'2016-06-09 18:42:46'),(40,'Teste 20','teste20','teste20',NULL,'DEV, GERENTE',NULL,1,'teste20@teste',1,'2016-06-09 18:48:07'),(41,'Teste 21','teste21','teste21',NULL,'DEV, GERENTE',NULL,1,'teste21@teste',1,'2016-06-09 18:52:23');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-09 21:11:49
