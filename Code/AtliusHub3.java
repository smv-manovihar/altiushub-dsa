import java.util.*;

public class AtliusHub3 {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine();
        List<List<Integer>> lists= new ArrayList<>();
        for(int i=0;i<n;i++){
            List<Integer> l = new ArrayList<>();
            String[] s = sc.nextLine().split(" ");
            for(String ss:s){
                l.add(Integer.parseInt(ss));
            }
            lists.add(l);
        }
        System.out.println(getSorted(lists));
        sc.close();
    }

    static List<Integer> getSorted(List<List<Integer>> lists){
        List<Integer> res = new ArrayList<>();
        int[] idx = new int[lists.size()];
        int minIdx=0;
        while(minIdx!=-1){
            int min = Integer.MAX_VALUE;
            minIdx=-1;
            for(int i=0;i<idx.length;i++){
                if(idx[i]==lists.get(i).size()){
                    continue;
                }
                if(min>lists.get(i).get(idx[i])){
                    min= lists.get(i).get(idx[i]);
                    minIdx=i;
                }
            }
            if(minIdx==-1){
                break;
            }
            res.add(min);
            idx[minIdx]++;
        }
        return res;
    }
}