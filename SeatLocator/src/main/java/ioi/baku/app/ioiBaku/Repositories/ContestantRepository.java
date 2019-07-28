package ioi.baku.app.ioiBaku.Repositories;

import ioi.baku.app.ioiBaku.Domain.ContestantData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;


@Repository
public interface ContestantRepository extends JpaRepository<ContestantData,Integer> {
    @Transactional
    @Modifying
    @Query(value = "UPDATE CONTESTANT_DATA u set u.SEAT =?1 where u.IP_ADDRESS = ?2",nativeQuery = true)
    void updateSeat(String seat,String ipAddress);

    ContestantData findByIpAddress(String ipAddress);



}

