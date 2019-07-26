package ioi.baku.app.ioiBaku.Controllers;
;
import com.opencsv.CSVReader;
import org.springframework.web.bind.annotation.*;


import java.io.File;
import java.io.FileReader;
import java.sql.*;

@RestController
public class ImportToDatabase {


    @RequestMapping("/import")
    public void importToDatabase() {

        try {
            /* Create Connection objects */
            Class.forName("org.h2.Driver");
            Connection conn = DriverManager.getConnection("jdbc:h2:mem:testdb", "sa", "password");
            Statement stmt = null;
            stmt = conn.createStatement();
            PreparedStatement sql_statement = null;
            String drop ="DROP TABLE IF EXISTS  CONTESTANT_DATA ";
            String create = "create table CONTESTANT_DATA (id int primary key, MAC_ADDRESS varchar(100), IP_ADDRESS varchar(100),SEAT varchar(100),LOGIN varchar(100),NAME varchar(100),SURNAME varchar(100))";
            String jdbc_insert_sql = "INSERT INTO CONTESTANT_DATA"
                    + "(ID,MAC_ADDRESS,IP_ADDRESS,SEAT,LOGIN,NAME,SURNAME) VALUES"
                    + "(?,?,?,?,?,?,?)";
          stmt.execute(drop);
            stmt.execute(create);
            sql_statement = conn.prepareStatement(jdbc_insert_sql);
            /* Read CSV file in OpenCSV */
            String inputCSVFile = "data.csv";
            CSVReader reader = new CSVReader(new FileReader(inputCSVFile));
            String[] nextLine;
            int lnNum = 0;
            //loop file , add records to batch
            while ((nextLine = reader.readNext()) != null) {
                lnNum++;
                /* Bind CSV file input to table columns */
                sql_statement.setInt(1,lnNum);
                /* Bind Age as double */
                /* Need to convert string to double here */
                sql_statement.setString(2, nextLine[0]);
                sql_statement.setString(3, nextLine[1]);

                sql_statement.setString(4, nextLine[2]);
                sql_statement.setString(5, nextLine[3]);
                sql_statement.setString(6, nextLine[4]);
                sql_statement.setString(7, nextLine[5]);



                // Add the record to batch
                sql_statement.addBatch();
            }
            //We are now ready to perform a bulk batch insert
            int[] totalRecords = new int[7];
            try {
                totalRecords = sql_statement.executeBatch();
            } catch (BatchUpdateException e) {
                //you should handle exception for failed records here
                totalRecords = e.getUpdateCounts();
            }
            System.out.println("Total records inserted in bulk from CSV file " + totalRecords.length);
            /* Close prepared statement */
            sql_statement.close();
            /* COMMIT transaction */
            conn.commit();
            /* Close connection */
            conn.close();
        } catch (Exception e) {
            System.out.println(e);
        }

    }
    @RequestMapping("/importp")
    public void importToDatabasePAth(@RequestParam(name="path", required = true) String path) {

        try {
            /* Create Connection objects */
            Class.forName("org.h2.Driver");
            Connection conn = DriverManager.getConnection("jdbc:h2:mem:testdb", "sa", "password");
            Statement stmt = null;
            stmt = conn.createStatement();
            PreparedStatement sql_statement = null;
            String drop ="DROP TABLE IF EXISTS  CONTESTANT_DATA ";
            String create = "create table CONTESTANT_DATA (id int primary key, MAC_ADDRESS varchar(100), IP_ADDRESS varchar(100),SEAT varchar(100),LOGIN varchar(100),NAME varchar(100),SURNAME varchar(100))";
            String jdbc_insert_sql = "INSERT INTO CONTESTANT_DATA"
                    + "(ID,MAC_ADDRESS,IP_ADDRESS,SEAT,LOGIN,NAME,SURNAME) VALUES"
                    + "(?,?,?,?,?,?,?)";
            stmt.execute(drop);
            stmt.execute(create);
            sql_statement = conn.prepareStatement(jdbc_insert_sql);
            /* Read CSV file in OpenCSV */
            String inputCSVFile = path;
            CSVReader reader = new CSVReader(new FileReader(inputCSVFile));
            System.out.println();
            String[] nextLine;
            int lnNum = 0;
            //loop file , add records to batch
            while ((nextLine = reader.readNext()) != null) {
                lnNum++;
                /* Bind CSV file input to table columns */
                sql_statement.setInt(1,lnNum);
                /* Bind Age as double */
                /* Need to convert string to double here */
                sql_statement.setString(2, nextLine[0]);
                sql_statement.setString(3, nextLine[1]);

                sql_statement.setString(4, nextLine[2]);
                sql_statement.setString(5, nextLine[3]);
                sql_statement.setString(6, nextLine[4]);
                sql_statement.setString(7, nextLine[5]);



                // Add the record to batch
                sql_statement.addBatch();
            }
            //We are now ready to perform a bulk batch insert
            int[] totalRecords = new int[7];
            try {
                totalRecords = sql_statement.executeBatch();
            } catch (BatchUpdateException e) {
                //you should handle exception for failed records here
                totalRecords = e.getUpdateCounts();
            }
            System.out.println("Total records inserted in bulk from CSV file " + totalRecords.length);
            /* Close prepared statement */
            sql_statement.close();
            /* COMMIT transaction */
            conn.commit();
            /* Close connection */
            conn.close();
        } catch (Exception e) {
            System.out.println(e);
        }

    }
}
