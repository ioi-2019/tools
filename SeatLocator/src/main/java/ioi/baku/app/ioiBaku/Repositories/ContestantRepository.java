package ioi.baku.app.ioiBaku.Repositories;

import ioi.baku.app.ioiBaku.Domain.ContestantData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ContestantRepository extends JpaRepository<ContestantData,Integer> {


    ContestantData findByIpAddress(String ipAddress);



}

